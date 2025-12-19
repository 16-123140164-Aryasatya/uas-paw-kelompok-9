# File: backend/app/views/borrowing.py
from pyramid.view import view_config
from pyramid.response import Response
from ..models import DBSession, Book, Borrowing, User, UserRole, BorrowStatus
from .auth import get_user_from_token
from datetime import datetime


@view_config(route_name='borrowings_list', request_method='GET', renderer='json')
def list_borrowings(request):
    """Get all borrowings. Optionally filter by status."""
    try:
        user = get_user_from_token(request)
        if not user:
            return Response(json={'success': False, 'message': 'Unauthorized'}, status=401)

        status = request.params.get('status')  # pending, active, overdue, returned, denied

        query = DBSession.query(Borrowing)

        # Members only see their own borrowings; librarians see all
        if user.role != UserRole.LIBRARIAN:
            query = query.filter(Borrowing.member_id == user.id)

        if status == 'pending':
            query = query.filter(Borrowing.status == BorrowStatus.PENDING)
        elif status == 'active':
            query = query.filter(Borrowing.status == BorrowStatus.ACTIVE)
        elif status == 'returned':
            query = query.filter(Borrowing.status == BorrowStatus.RETURNED)
        elif status == 'denied':
            query = query.filter(Borrowing.status == BorrowStatus.DENIED)
        elif status == 'overdue':
            query = query.filter(
                Borrowing.status == BorrowStatus.ACTIVE,
                Borrowing.due_date < datetime.now().date()
            )

        borrowings = query.order_by(Borrowing.borrow_date.desc()).all()

        return Response(
            json={'success': True, 'data': [b.to_dict() for b in borrowings]},
            status=200
        )
    except Exception as e:
        return Response(json={'success': False, 'message': str(e)}, status=500)


@view_config(route_name='borrowings_my', request_method='GET', renderer='json')
def my_borrowings(request):
    """Get active/pending borrowings for the authenticated user."""
    try:
        user = get_user_from_token(request)
        if not user:
            return Response(json={'success': False, 'message': 'Unauthorized'}, status=401)

        borrowings = DBSession.query(Borrowing).filter(
            Borrowing.member_id == user.id,
            Borrowing.status.in_([BorrowStatus.PENDING, BorrowStatus.ACTIVE])
        ).order_by(Borrowing.borrow_date.desc()).all()

        return Response(json={'success': True, 'data': [b.to_dict() for b in borrowings]}, status=200)
    except Exception as e:
        return Response(json={'success': False, 'message': str(e)}, status=500)


@view_config(route_name='borrowings_history', request_method='GET', renderer='json')
def borrowing_history(request):
    """Get borrowing history for current user (librarian sees all)."""
    try:
        user = get_user_from_token(request)
        if not user:
            return Response(json={'success': False, 'message': 'Unauthorized'}, status=401)

        if user.role == UserRole.LIBRARIAN:
            borrowings = DBSession.query(Borrowing).order_by(Borrowing.borrow_date.desc()).all()
        else:
            borrowings = DBSession.query(Borrowing).filter(
                Borrowing.member_id == user.id
            ).order_by(Borrowing.borrow_date.desc()).all()

        return Response(json={'success': True, 'data': [b.to_dict() for b in borrowings]}, status=200)
    except Exception as e:
        return Response(json={'success': False, 'message': str(e)}, status=500)


@view_config(route_name='borrowings_create', request_method='POST', renderer='json')
def create_borrowing(request):
    """Create a pending borrow request (member or librarian acting as member)."""
    try:
        user = get_user_from_token(request)
        if not user:
            return Response(json={'success': False, 'message': 'Unauthorized'}, status=401)
        if user.role not in [UserRole.MEMBER, UserRole.LIBRARIAN]:
            return Response(json={'success': False, 'message': 'Forbidden'}, status=403)

        data = request.json_body or {}
        if 'book_id' not in data:
            return Response(json={'success': False, 'message': 'book_id is required'}, status=400)

        book_id = data['book_id']
        book = DBSession.query(Book).filter_by(id=book_id).first()
        if not book:
            return Response(json={'success': False, 'message': 'Book not found'}, status=404)

        if not book.is_available_to_borrow():
            return Response(json={'success': False, 'message': 'Book is not available for borrowing'}, status=400)

        existing_borrow = DBSession.query(Borrowing).filter(
            Borrowing.member_id == user.id,
            Borrowing.book_id == book_id,
            Borrowing.status.in_([BorrowStatus.PENDING, BorrowStatus.ACTIVE])
        ).first()
        if existing_borrow:
            return Response(json={'success': False, 'message': 'You already have this book borrowed or pending'}, status=400)

        active_count = DBSession.query(Borrowing).filter(
            Borrowing.member_id == user.id,
            Borrowing.status.in_([BorrowStatus.PENDING, BorrowStatus.ACTIVE])
        ).count()
        if active_count >= 3:
            return Response(json={'success': False, 'message': 'Borrowing limit reached (max 3 books)'}, status=400)

        borrowing = Borrowing(
            book_id=book_id,
            member_id=user.id,
            borrow_date=datetime.now().date(),
            status=BorrowStatus.PENDING
        )

        DBSession.add(borrowing)
        DBSession.flush()
        DBSession.commit()

        return Response(
            json={'success': True, 'message': 'Borrow request created and pending approval', 'data': borrowing.to_dict()},
            status=201
        )
    except Exception as e:
        import traceback
        print("[ERROR] create_borrowing exception:")
        traceback.print_exc()
        DBSession.rollback()
        return Response(json={'success': False, 'message': str(e)}, status=500)


@view_config(route_name='borrowings_return', request_method='POST', renderer='json')
def return_book(request):
    """Return an active borrowing (member or librarian)."""
    try:
        user = get_user_from_token(request)
        if not user:
            return Response(json={'success': False, 'message': 'Unauthorized'}, status=401)

        borrowing_id = request.matchdict['id']
        borrowing = DBSession.query(Borrowing).filter_by(id=borrowing_id).first()
        if not borrowing:
            return Response(json={'success': False, 'message': 'Borrowing record not found'}, status=404)

        if borrowing.status in [BorrowStatus.RETURNED, BorrowStatus.DENIED]:
            return Response(json={'success': False, 'message': 'Borrowing already closed'}, status=400)
        if borrowing.status == BorrowStatus.PENDING:
            return Response(json={'success': False, 'message': 'Borrowing is pending approval'}, status=400)

        if user.role != UserRole.LIBRARIAN and borrowing.member_id != user.id:
            return Response(json={'success': False, 'message': 'Forbidden'}, status=403)

        borrowing.return_date = datetime.now().date()
        borrowing.status = BorrowStatus.RETURNED
        fine = borrowing.calculate_fine()
        borrowing.book.increase_available()

        DBSession.flush()
        DBSession.commit()

        return Response(
            json={
                'success': True,
                'message': 'Book returned successfully',
                'data': {
                    'borrowing': borrowing.to_dict(),
                    'fine': float(fine),
                    'fine_message': f'Late return fine: Rp {fine:,.0f}' if fine > 0 else 'No fine'
                }
            },
            status=200
        )
    except Exception as e:
        DBSession.rollback()
        return Response(json={'success': False, 'message': str(e)}, status=500)


@view_config(route_name='borrowings_approve', request_method='POST', renderer='json')
def approve_borrowing(request):
    """Librarian approves a pending borrow request and activates it."""
    try:
        user = get_user_from_token(request)
        if not user:
            return Response(json={'success': False, 'message': 'Unauthorized'}, status=401)
        if user.role != UserRole.LIBRARIAN:
            return Response(json={'success': False, 'message': 'Forbidden: librarian only'}, status=403)

        borrowing_id = request.matchdict['id']
        borrowing = DBSession.query(Borrowing).filter_by(id=borrowing_id).first()
        if not borrowing:
            return Response(json={'success': False, 'message': 'Borrowing record not found'}, status=404)

        if borrowing.status == BorrowStatus.RETURNED:
            return Response(json={'success': False, 'message': 'Borrowing already returned'}, status=400)
        if borrowing.status == BorrowStatus.DENIED:
            return Response(json={'success': False, 'message': 'Borrowing has been denied'}, status=400)
        if borrowing.status == BorrowStatus.ACTIVE:
            return Response(json={'success': False, 'message': 'Borrowing already approved'}, status=400)

        if not borrowing.book.is_available_to_borrow():
            return Response(json={'success': False, 'message': 'No available copies to approve'}, status=400)

        borrowing.status = BorrowStatus.ACTIVE
        borrowing.return_date = None
        borrowing.borrow_date = borrowing.borrow_date or datetime.now().date()
        borrowing.book.decrease_available()

        DBSession.flush()
        DBSession.commit()

        return Response(json={'success': True, 'message': 'Borrowing approved and activated', 'data': borrowing.to_dict()}, status=200)
    except Exception as e:
        DBSession.rollback()
        return Response(json={'success': False, 'message': str(e)}, status=500)


@view_config(route_name='borrowings_deny', request_method='POST', renderer='json')
def deny_borrowing(request):
    """Librarian denies a pending borrow request."""
    try:
        user = get_user_from_token(request)
        if not user:
            return Response(json={'success': False, 'message': 'Unauthorized'}, status=401)
        if user.role != UserRole.LIBRARIAN:
            return Response(json={'success': False, 'message': 'Forbidden: librarian only'}, status=403)

        borrowing_id = request.matchdict['id']
        borrowing = DBSession.query(Borrowing).filter_by(id=borrowing_id).first()
        if not borrowing:
            return Response(json={'success': False, 'message': 'Borrowing record not found'}, status=404)

        if borrowing.status == BorrowStatus.RETURNED:
            return Response(json={'success': False, 'message': 'Borrowing already returned'}, status=400)
        if borrowing.status == BorrowStatus.DENIED:
            return Response(json={'success': False, 'message': 'Borrowing already denied'}, status=400)
        if borrowing.status == BorrowStatus.ACTIVE:
            borrowing.book.increase_available()
            borrowing.return_date = datetime.now().date()

        borrowing.status = BorrowStatus.DENIED

        DBSession.flush()
        DBSession.commit()

        return Response(json={'success': True, 'message': 'Borrowing denied', 'data': borrowing.to_dict()}, status=200)
    except Exception as e:
        DBSession.rollback()
        return Response(json={'success': False, 'message': str(e)}, status=500)
