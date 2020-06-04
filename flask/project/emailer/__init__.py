import os

from flask import Flask

def create_app(test_config=None):
    app = Flask(__name__, instance_relative_config=True)

    if test_config is None:
        app.config.from_pyfile('config.cfg', silent=True)
    else:
        app.config.from_mapping(test_config)

    @app.route('/')
    def hello():
        print('=== app.instance_path', app.instance_path)
        print('SENDGRID_VALUE', app.config['SENDGRID_VALUE'])
        print('COLOR', app.config['COLOR'])
        return 'Hello, World 2 - ' + app.instance_path

    return app