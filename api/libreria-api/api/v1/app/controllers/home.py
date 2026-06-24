from flask import Blueprint, Response, jsonify

home_endpoints = Blueprint("home_endpoints", __name__)

@home_endpoints.route("/", methods=["GET"])
def home():

    html = """
    <!DOCTYPE html>
    <html>
    <head>
        <title>API Librería</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                max-width: 800px;
                margin: 50px auto;
                padding: 20px;
                background-color: #f5f5f5;
            }

            .card {
                background: white;
                padding: 30px;
                border-radius: 10px;
                box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            }

            h1 {
                color: #2c3e50;
            }

            ul {
                line-height: 1.8;
            }

            code {
                background: #eee;
                padding: 2px 5px;
                border-radius: 4px;
            }
        </style>
    </head>
    <body>

        <div class="card">
            <h1>📚 API Librería</h1>

            <p>La API está funcionando correctamente.</p>

            <h3>Endpoints disponibles</h3>

            <ul>
                <li><code>GET /libreria/api/v1/libros</code></li>
                <li><code>GET /libreria/api/v1/usuarios</code></li>
                <li><code>GET /health</code></li>
            </ul>

            <p>Versión: 1.0</p>
        </div>

    </body>
    </html>
    """

    return Response(html, mimetype="text/html")

@home_endpoints.route("/health", methods=["GET"])
def health():
    return jsonify({
        "status": "UP"
    })