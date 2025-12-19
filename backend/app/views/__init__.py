from pyramid.view import view_config  # noqa: F401
from pyramid.response import Response  # noqa: F401

# Import view modules so pyramid scans and registers them
from . import user  # noqa: F401

def success_response(data=None, message="Success"):
    """Standard success response"""
    return Response(
        json={"success": True, "message": message, "data": data},
        status=200,
        content_type='application/json'
    )

def error_response(message="Error", status=400, errors=None):
    """Standard error response"""
    return Response(
        json={"success": False, "message": message, "errors": errors},
        status=status,
        content_type='application/json'
    )
