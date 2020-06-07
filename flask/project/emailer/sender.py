from flask import Blueprint
from flask import current_app
from flask import request
from flask import abort, jsonify
from flask_cors import cross_origin
from emailer.helpers import send_email


bp = Blueprint("sender", __name__, url_prefix="/sender")

@bp.errorhandler(400)
def missing_fields(e):
    return jsonify(error=str(e)), 400

@bp.route('/', methods=['POST'])
@cross_origin()
def process():
    if request.method == 'POST':
        json_data = request.get_json()
        if len(json_data['fields']) == 0:
            abort(400, description="Missing fields")
        response = send_email(json_data, current_app.config['SENDGRID_API_KEY'])
        return {
            "success": True,
            "sendgrid_status_code": response.status_code
        }


