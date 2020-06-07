import unittest
from emailer.helpers import send_email


class TestEndpoint(unittest.TestCase):

    # def setUp(self):
    #     pass

    def test_one(self):
        self.assertEqual(1, 1)

    def test_two(self):
        self.assertEqual(2, 2)


if __name__ == '__main__':
    unittest.main()