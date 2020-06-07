from flask import Blueprint
from flask import current_app
from flask import request
from flask_cors import cross_origin
from emailer.helpers import send_email


bp = Blueprint("sender", __name__, url_prefix="/sender")


@bp.route('/', methods=['POST'])
@cross_origin()
def process():
    if request.method == 'POST':
        data = request.get_json()
        response = send_email(data, current_app.config['SENDGRID_API_KEY'])
        return {
            "success": True,
            "status_code": response.status_code
        }
