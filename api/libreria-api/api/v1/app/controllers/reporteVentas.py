from flask import Blueprint, request, jsonify
from app.models.reportesVentas import ReportesVentas
from app.utils.token import token_requerido

reporteVentas_endpoints = Blueprint('reporteVentas_endpoints', __name__)

@reporteVentas_endpoints.route('/reportesVentas/top3', methods=['GET'])
#@token_requerido
def top_3_libros_mas_vendidos():
    resultados = ReportesVentas.top_3_libros_mas_vendidos()
    return jsonify(resultados), 200


@reporteVentas_endpoints.route('/reportesVentas/top5', methods=['GET'])
#@token_requerido
def top_5_libros_mas_vendidos():
    resultados = ReportesVentas.top_5_libros_mas_vendidos()
    return jsonify(resultados), 200


@reporteVentas_endpoints.route('/reportesVentas/libros', methods=['GET'])
#@token_requerido
def libros_con_ventas():
    resultados = ReportesVentas.libros_con_ventas()
    return jsonify(resultados), 200


@reporteVentas_endpoints.route('/reportesVentas/libros-stock', methods=['GET'])
#@token_requerido
def libros_vendidos_con_stock():
    resultados = ReportesVentas.libros_vendidos_con_stock()
    return jsonify(resultados), 200
