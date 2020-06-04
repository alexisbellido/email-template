from flask import Flask

from flask import current_app # try in other modules

def create_app(test_config=None):
    app = Flask(__name__, instance_relative_config=True)

    if test_config is None:
        app.config.from_pyfile('config.py', silent=True)
    else:
        app.config.from_mapping(test_config)

    @app.route('/')
    def hello():
        print('=== app.instance_path', app.instance_path)
        print('SENDGRID_VALUE', app.config['SENDGRID_VALUE'])
        print('SENDGRID_VALUE from current_app', current_app.config['SENDGRID_VALUE'])
        return 'Hello, World 2 - ' + app.instance_path

    return app