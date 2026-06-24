from flask import Flask
from flask_pymongo import PyMongo
from flask_cors import CORS
import os

mongo = PyMongo()

def create_app():

    app = Flask(__name__)
    # URI en formato string (correcto)





    from .controllers.libros import libros_endpoints
    from .controllers.home import home_endpoints

    app.register_blueprint(home_endpoints)
    app.register_blueprint(libros_endpoints, url_prefix="/libreria/api/v1")
  
    CORS(app, origins="*")

    return app

