from flask import Blueprint
from flask import current_app
from flask import request
from flask_cors import cross_origin
from emailer.helpers import prepare_to_send


bp = Blueprint("sender", __name__, url_prefix="/sender")


@bp.route('/', methods=['POST'])
@cross_origin()
def process_template():
    """
    Take a JSON payload, render the template in it, and send an
    email.
    Note we are allowing all origins for demonstration purposes.
    """
    if request.method == 'POST':
        data = request.get_json()
        response = prepare_to_send(data, current_app.config['SENDGRID_API_KEY'])
        return {
            "success": True,
            "status_code": response.status_code
        }
