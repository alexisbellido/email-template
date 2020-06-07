import sendgrid
from flask import render_template_string


def _send_email(api_key, sg_data):
    sg = sendgrid.SendGridAPIClient(api_key=api_key)
    response = sg.client.mail.send.post(request_body=sg_data)
    return response


def send_email(data, api_key):
    rendered_template = render_template_string(
        data['template'],
        **data['fields']
    )
    sg_data = {
        "personalizations": [
            {
                "to": [
                    {
                        "email": data['recipient']
                    }
                ],
                "subject": "Message from " + data['sender']
            }
        ],
        "from": {
            "email": data['sender']
        },
        "content": [
            {
                "type": "text/plain",
                "value": rendered_template
            }
        ]
    }
    response = _send_email(api_key, sg_data)
    return response
