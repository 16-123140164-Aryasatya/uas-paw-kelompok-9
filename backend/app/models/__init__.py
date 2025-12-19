from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import scoped_session, sessionmaker

DBSession = scoped_session(sessionmaker(expire_on_commit=False))
# NOTE: Do not register the session with zope.sqlalchemy.
# We manage transactions manually in view code using DBSession.commit()/rollback().
# expire_on_commit=False prevents "current transaction is aborted" errors when
# session state is shared across requests in scoped_session.
Base = declarative_base()

# Import all models
from .user import User, UserRole
from .book import Book
from .borrowing import Borrowing, BorrowStatus

__all__ = ['Base', 'DBSession', 'User', 'UserRole', 'Book', 'Borrowing', 'BorrowStatus']
