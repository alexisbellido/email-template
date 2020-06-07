import sendgrid
from flask import render_template_string


def send_email(json_data, api_key):
    sg = sendgrid.SendGridAPIClient(api_key=api_key)
    rendered_template = render_template_string(json_data['template'], **json_data['fields'])
    data = {
        "personalizations": [
            {
                "to": [
                    {
                        "email": json_data['recipient']
                    }
                ],
                "subject": "Message from " + json_data['sender']
            }
        ],
        "from": {
            "email": json_data['sender']
        },
        "content": [
            {
                "type": "text/plain",
                "value": rendered_template
            }
        ]
    }
    response = sg.client.mail.send.post(request_body=data)
    return response