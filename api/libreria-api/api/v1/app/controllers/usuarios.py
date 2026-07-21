from flask import Blueprint, request, jsonify
from app.models.usuario import UsuarioModel
 

usuarios_endpoints = Blueprint('usuarios_endpoints', __name__)

@usuarios_endpoints.route('/usuarios', methods=['GET'])
#@token_requerido
def obtenerUsuarios():
    idUsuario = request.args.get('id')

    if idUsuario:
        usuario = UsuarioModel.obtener_por_id(idUsuario)
        if usuario:
            return jsonify(usuario), 200
        return jsonify({"error": "Usuario no encontrado"}), 404

    usuarios = UsuarioModel.obtener_todos()
    return jsonify(usuarios), 200


@usuarios_endpoints.route('/usuarios', methods=['POST'])
def addUsuario():
    data = request.get_json()

    if not data:
        return jsonify({"error": "Datos vacíos"}), 400

    # Validar campos básicos si los necesitas
    if "nombre" not in data or "apellido" not in data or "email" not in data:
        return jsonify({"error": "Faltan campos obligatorios del usuario"}), 400

    idUsuario = UsuarioModel.crear(data)
    if not idUsuario:
        return jsonify({"error": "No se pudo crear el usuario"}), 500

    return jsonify({"id": str(idUsuario)}), 200


@usuarios_endpoints.route('/usuarios/<idUsuario>', methods=['PUT'])
#@token_requerido
def updateUsuario(idUsuario):
    data = request.get_json()
    if data is None:
        return jsonify({"error": "Datos vacios"}), 400

    resultado = UsuarioModel.actualizar(idUsuario, data)
    if resultado == -1:
        return jsonify({"error": "Usuario no actualizado."}), 404

    return jsonify({"Usuario actualizado correctamente": idUsuario}), 200


@usuarios_endpoints.route('/usuarios/login', methods=['POST'])
def login():

    data = request.get_json()

    if not data:
        return jsonify({"error": "Datos vacíos"}), 400

    username = data.get("username")
    password = data.get("password")

    if not username or not password:
        return jsonify({"error": "Usuario y contraseña son obligatorios"}), 400

    usuario = UsuarioModel.login(username, password)

    if usuario is None:
        return jsonify({
            "mensaje": "Usuario o contraseña incorrectos"
        }), 401

    return jsonify({
        "mensaje": "Login exitoso",
        "usuario": usuario
    }), 200

