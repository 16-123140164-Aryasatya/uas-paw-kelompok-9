from pyramid.view import view_config
from pyramid.response import Response
from sqlalchemy.exc import SQLAlchemyError
from ..models.mymodel import MyModel

from .. import models


# HOME → JSON
@view_config(route_name='home', renderer='json')
def home(request):
    return {"message": "Backend Pyramid berjalan!"}


# GET ALL DATA FROM TABLE MODELS
@view_config(route_name='get_models', renderer='json')
def get_models(request):
    try:
        query = request.dbsession.query(MyModel).all()
        result = [
            {
                "id": m.id,
                "name": m.name,
                "value": m.value
            }
            for m in query
        ]
        return {"status": "success", "data": result}

    except SQLAlchemyError:
        return {"status": "error", "message": "Database error"}


# REGISTER API (contoh)
@view_config(route_name='register', request_method='POST', renderer='json')
def register(request):
    try:
        data = request.json_body

        username = data.get("username")
        password = data.get("password")
        email = data.get("email")

        if not username or not password or not email:
            return {"status": "error", "message": "Field tidak lengkap"}

        user = MyModel(name=username, value=0)
        request.dbsession.add(user)

        return {"status": "success", "message": "Register berhasil"}

    except Exception as e:
        return {"status": "error", "message": str(e)}
