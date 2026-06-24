from flask import Blueprint, request, jsonify

libros_endpoints = Blueprint('libros_endpoints', __name__)

# GET todos los libros o un libro por ID
@libros_endpoints.route('/libros', methods=['GET'])
def obtenerLibros():

    idLibro = request.args.get('id')

    if idLibro:
        # Aquí se llamará al modelo para buscar un libro por ID en MongoDB.
        return jsonify({
            "id": idLibro,
            "titulo": "Libro de ejemplo"
        }), 200

    # Aquí se llamará al modelo para obtener todos los libros desde MongoDB.
    return jsonify([]), 200


@libros_endpoints.route('/hola', methods=['GET'])
def obtenerHolaMundo():
    return "hola mundo"


# POST crear libro
@libros_endpoints.route('/libros', methods=['POST'])
def addLibro():

    data = request.get_json()

    if not data:
        return jsonify({"error": "Datos vacíos"}), 400

    # Aquí se validarán los datos recibidos.
    # Aquí se llamará al modelo para insertar el libro en MongoDB.

    return jsonify({
        "mensaje": "Libro creado correctamente",
        "id": "nuevo_id"
    }), 201


# PUT actualizar libro
@libros_endpoints.route('/libros/<idLibro>', methods=['PUT'])
def updateLibro(idLibro):

    data = request.get_json()

    if not data:
        return jsonify({"error": "Datos vacíos"}), 400

    # Aquí se validarán los datos recibidos.
    # Aquí se llamará al modelo para actualizar el libro en MongoDB.

    return jsonify({
        "mensaje": f"Libro {idLibro} actualizado correctamente"
    }), 200


# DELETE eliminar libro
@libros_endpoints.route('/libros/<idLibro>', methods=['DELETE'])
def eliminarLibro(idLibro):

    # Aquí se llamará al modelo para eliminar el libro de MongoDB.

    return jsonify({
        "mensaje": f"Libro {idLibro} eliminado correctamente"
    }), 200