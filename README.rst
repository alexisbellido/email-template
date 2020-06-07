Email Template Feature
==================================================================

Provide the user the ability to define a template for an email and then use that template to send personalized emails to customers.


Installation
---------------------------------------------

Build Flask Docker image.

.. code-block:: bash

    $ cd flask
    $ docker build -t alexisbellido/python:3.7.6 .

Start with Docker Compose from the root of the project.

.. code-block:: bash

    $ docker-compose up

That's it. You can now use the endpoints described below.

Usage
--------------------------------------------

You can test with the following curl commands.

.. code-block:: bash

    $ curl -X POST -H "Content-Type: application/json" -d '{"template": "Hello, I like the color {{color}} and I am from planet {{planet}}. My favorite animal is {{animal}}.", "sender": "sender@example.com", "recipient": "recipient@example.com", "fields": {"color": "blue", "planet": "pluto", "animal": "horse"}}' http://localhost:8000/sender/

I also included a few basic unit tests.

.. code-block:: bash

    $ python tests.py

This is just a proof of concept. It doesn't consider edge cases and has incomplete test coverage.

Create instance directory and initial configuration
----------------------------------------------------------

.. code-block:: bash

    $ cd flask/project
    $ mkdir instance
    $ copy config-sample.py instance/config.py


Docker notes
---------------------------------------------

Launch and ssh into the Flask container. This will be used as the backend service.

.. code-block:: bash

    $ cd flask/project
    $ docker run -it --rm --mount type=bind,source=$PWD,target=/root/project alexisbellido/python:3.7.6 bash

Launch and ssh into the Flask container via docker-entrypoint.sh.

.. code-block:: bash

    $ cd flask/project
    $ docker run -it --rm --mount type=bind,source=$PWD,target=/root/project -p 8000:8000 alexisbellido/python:3.7.6 -- /usr/local/bin/docker-entrypoint.sh bash

Run Flask in development mode.

.. code-block:: bash

    $ cd flask/project
    $ docker run --rm --mount type=bind,source=$PWD,target=/root/project -p 8000:8000 alexisbellido/python:3.7.6 -- /usr/local/bin/docker-entrypoint.sh development

Once the containers are running you can ssh into any of them.

.. code-block:: bash

    $ docker exec -it email-template_backend_1 bash
    $ docker exec -it email-template_frontend_1 bash

If you want to run commands and some tests you will need to map volumes, for example, with the frontend.

.. code-block:: bash

    $ cd react/simon-templar
    $ docker run -it --rm --mount type=bind,source=$PWD,target=/root/simon-templar --mount type=bind,source=$PWD/node_modules,target=/root/simon-templar/node_modules,consistency=cached -w /root/simon-templar -p 3000:3000 node:14.4.0-stretch bash

Installation
---------------------------------------------

1. Start by pulling the public Docker images used by the backend and frontend services.

.. code-block:: bash

    $ docker pull alexisbellido/python:3.7.6
    $ docker pull node:14.4.0-stretch

2. Change to the React application directory and run the frontend container with some volumes mapped to the host to install the required NodeJS packages.

.. code-block:: bash

    $ cd react/simon-templar
    $ docker run -it --rm --mount type=bind,source=$PWD,target=/root/simon-templar --mount type=bind,source=$PWD/node_modules,target=/root/simon-templar/node_modules,consistency=cached -w /root/simon-templar -p 3000:3000 node:14.4.0-stretch npm install

3. Go back to the root of the project and start Docker Compose.

.. code-block:: bash

    $ cd ../..
    $ $ docker-compose up

4. Access the application at http://localhost:3000/.

5. You can run the backend tests from the host while the backend container is running.

.. code-block:: bash

    $ docker exec -it email-template_backend_1 python tests.py

Notes
---------------------------------------------

For demonstration purposes both Flask and React are running on development mode.

As this a very simple application I haven't spent much time building a more reusable CSS structure and I'm just importing a CSS file for each React component. For a bigger application I'd a more manageable approach.

As the templates are simple, just variable replacement, and Jinja and Handlebars use the same approach, {{variable}} placeholders, I am using Handlebars to run a preview on the frontend to avoid a call to the API.

As the frontend and the backend run on different origins (React in port 3000 and Flask in port 8000) I've used the Flask-CORS extension to allow all origins for the /sender/ API endpoint. On production I'd restrict this to work only with the origins we trust or. Clients that are not running from an allowed origin would need to write their own backend proxy and instruct their frontend applications to call our API from there.

I have added a couple of simple tests for the backend. One to verify the POST call to the API endpoint is processing the payload and another that mocks the call to SendGrid, which may be unnecessary as the call to the endpoint also calls that function.

I have not included tests for the frontend.

The React app is validating the email fields using a basic regular expression (name@host.tld) that may not cover all the possible formats as described in RFC 2822 but should be good enough for this demonstration.

TODO
---------------------------------------------

- write backend tests
- Remove old and unused code, including css and comments
- deploy on thefelineuniverse.com and test? maybe not, probably a video with demo
- rebuild and publish Python Docker image
- write installation instructions including  docker exec bash and npm install for frontend before docker-compose up



