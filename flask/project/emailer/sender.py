from flask import Blueprint
from flask import current_app
from flask import request, render_template_string
from flask import abort, jsonify
import sendgrid

bp = Blueprint("sender", __name__, url_prefix="/sender")

@bp.errorhandler(400)
def missing_fields(e):
    return jsonify(error=str(e)), 400

@bp.route('/', methods=['POST'])
def process():
    if request.method == 'POST':
        json_data = request.get_json()
        if len(json_data['fields']) == 0:
            abort(400, description="Missing fields")
        sg = sendgrid.SendGridAPIClient(api_key=current_app.config['SENDGRID_API_KEY'])
        rendered_template = render_template_string(json_data['template'], **json_data['fields'])
        sender = json_data['sender']
        recipient = json_data['recipient']
        data = {
            "personalizations": [
                {
                    "to": [
                        {
                            "email": recipient
                        }
                    ],
                    "subject": "Message from " + sender
                }
            ],
            "from": {
                "email": sender
            },
            "content": [
                {
                    "type": "text/plain",
                    "value": rendered_template
                }
            ]
        }
        sg_response = sg.client.mail.send.post(request_body=data)
        return {
            "success": True,
            "sendgrid_status_code": sg_response.status_code
        }


