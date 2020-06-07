import json
import unittest
from unittest.mock import patch
from emailer.helpers import prepare_to_send
from emailer import create_app


class TestEndpoint(unittest.TestCase):
    """
    The tests patch emailer.helpers._send_email to mock
    SendGrid calls.
    """

    def setUp(self):
        self.app = create_app({
            "TESTING": True,
            "SENDGRID_API_KEY": "DUMMY-KEY"
        })
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
        """
        Test a POST call to the /sender/ API endpoint, which takes
        care of rendering the template and sending the email.
        """
        mock_send_email.return_value.status_code = 200
        response = self.client.post(
            '/sender/',
            data=json.dumps(self.data),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, 200)

    @patch('emailer.helpers._send_email')
    def test_send_email(self, mock_send_email):
        """
        Test just the send_mail helper function.
        """
        mock_send_email.return_value.status_code = 202
        mock_send_email.return_value.success = True
        response = prepare_to_send(self.data, self.app.config['SENDGRID_API_KEY'])
        self.assertEqual(response.status_code, 202)
        self.assertTrue(response.success)


if __name__ == '__main__':
    unittest.main()
