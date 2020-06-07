import json
import unittest
from unittest.mock import patch
from emailer.helpers import send_email
from emailer import create_app


class TestEndpoint(unittest.TestCase):

    def setUp(self):
        self.app = create_app({"TESTING": True})
        self.app_context = self.app.app_context()
        self.app_context.push()
        self.client = self.app.test_client()
        self.data = {
            "template": "Favorite color: {{color}}",
            "sender": "from@example.com",
            "recipient": "to@example.com",
            "fields": {
                "color": "red"
            }
        }

    @patch('emailer.helpers._send_email')
    def test_post_to_sender(self, mock_send_email):
        mock_send_email.return_value.status_code = 200
        self.app.config['SENDGRID_API_KEY'] = 'DUMMY-KEY'
        response = self.client.post(
            '/sender/',
            data=json.dumps(self.data),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, 200)

    @patch('emailer.helpers._send_email')
    def test_send_email(self, mock_send_email):
        mock_send_email.return_value.status_code = 202
        mock_send_email.return_value.success = True
        response = send_email(self.data, 'DUMMY-KEY')
        self.assertEqual(response.status_code, 202)
        self.assertTrue(response.success)


if __name__ == '__main__':
    unittest.main()
