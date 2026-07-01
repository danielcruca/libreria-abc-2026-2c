from flask import Flask
from flask_pymongo import PyMongo
from flask_cors import CORS
import os

mongo = PyMongo()

def create_app():

    app = Flask(__name__)
    # URI en formato string (correcto)
  
    uri = ''
    app.config["MONGO_URI"] = uri
    mongo.init_app(app)
    CORS(app, origins="*")

    from .controllers.libros import libros_endpoints
    from .controllers.reporteVentas import reporteVentas_endpoints
    from .controllers.home import home_endpoints

    app.register_blueprint(home_endpoints)
    app.register_blueprint(libros_endpoints, url_prefix="/libreria/api/v1")
    app.register_blueprint(reporteVentas_endpoints, url_prefix="/libreria/api/v1")
    

    return app

