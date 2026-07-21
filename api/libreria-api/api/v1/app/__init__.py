from flask import Flask
from flask_pymongo import PyMongo
from flask_cors import CORS
import os
from dotenv import load_dotenv #acá

mongo = PyMongo()

def create_app():
    load_dotenv()  # Carga las variables de entorno desde el archivo .env
    app = Flask(__name__)
    # URI en formato string (correcto)
  
    app.config["MONGO_URI"] = os.getenv("MONGO_URI")
    mongo.init_app(app)
    CORS(app, origins="*")

    from .controllers.libros import libros_endpoints
    from .controllers.reporteVentas import reporteVentas_endpoints
    from .controllers.home import home_endpoints
    from .controllers.usuarios import usuarios_endpoints

    app.register_blueprint(home_endpoints)
    app.register_blueprint(libros_endpoints, url_prefix="/libreria/api/v1")
    app.register_blueprint(reporteVentas_endpoints, url_prefix="/libreria/api/v1")
    app.register_blueprint(usuarios_endpoints, url_prefix="/libreria/api/v1")
    

    return app

