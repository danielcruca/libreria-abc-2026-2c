# API REST - Gestión de Usuarios

API REST desarrollada con Flask y MongoDB para la gestión de usuarios y autenticación mediante tokens.

## Tecnologías utilizadas

* Python 3.11
* Flask
* Flask-Cors
* Flask-PyMongo
* PyMongo
* MongoDB
* Python Dotenv

---

## Requisitos previos

Antes de ejecutar el proyecto asegúrate de tener instalado:

* Python 3.11 o superior
* MongoDB (local o remoto)
* Git (opcional)

Verificar instalación:

```bash
python --version
```


## Instalar dependencias

```bash
pip install -r requirements.txt
```

Contenido recomendado de `requirements.txt`:

```txt
Flask==3.1.2
Flask-Cors==6.0.1
Flask-PyMongo==3.0.1
pymongo==4.13.2
python-dotenv==1.1.1
```


## Ejecutar la aplicación

Ubicarse en el directorio donde se encuentra `run.py`.

```bash
python run.py
```

o alternativamente:

```bash
flask --app run run
```

La API estará disponible en:

```txt
http://localhost:5000
```




