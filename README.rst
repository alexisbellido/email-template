Simon Templar
==================================================================

This is an application that allows using a template to send personalized emails. It consists of one API endpoint running on Flask and a single page application on React.

For demonstration purposes both Flask and React are running on development mode.

As this is a simple demonstration I haven't built a more reusable CSS structure; I'm just importing one CSS file per each React component. For a bigger application I'd choose a more manageable approach.

As the templates are simple, just variable replacements, and Jinja and Handlebars use the same approach for {{variable}} replacement, I am using Handlebars to render a preview on the frontend and save a call to the API.

As the frontend and the backend run on different origins, React on port 3000 and Flask on port 8000, I've used the Flask-CORS extension to allow all origins for the /sender/ API endpoint. On production I'd restrict this to work only with the origins we trust. Clients that are not running from an allowed origin would need to write their own backend proxy and call our API from there.

I've added a couple of simple tests for the backend. One to verify that the POST call to the API endpoint is processing the payload and another that mocks the call to SendGrid. I have not included tests for the frontend.

The React app is validating the email fields using a basic regular expression (name@host.tld) that may not cover all the possible formats as described in RFC 2822 but should be good enough for this demonstration.

Installation
---------------------------------------------

Unless otherwise noted you should run all commands below from the root directory of this project.

1. Start by pulling the public Docker images used by the backend and frontend services.

.. code-block:: bash

    $ docker pull alexisbellido/python:3.7.6
    $ docker pull node:14.4.0-stretch

2. Create the flask/project/instance directory and copy the initial configuration, config.py, for the backend. Note this file is not under version control.

.. code-block:: bash

    $ mkdir -p flask/project/instance
    $ cp flask/project/config-sample.py flask/project/instance/config.py

3. Change to the React application directory and run the frontend container with some volumes mapped to the host to install NodeJS packages.

.. code-block:: bash

    $ cd react/simon-templar
    $ docker run -it --rm --mount type=bind,source=$PWD,target=/root/simon-templar -w /root/simon-templar -p 3000:3000 node:14.4.0-stretch npm install

4. Go back to the root of the project and start Docker Compose.

.. code-block:: bash

    $ docker-compose up

5. Access the application at http://localhost:3000/.

6. Execute the backend tests from the host while the backend container is running.

.. code-block:: bash

    $ docker exec -it email-template_backend_1 python tests.py

Notes
---------------------------------------------

Build Flask Docker image.

.. code-block:: bash

    $ cd flask
    $ docker build -t alexisbellido/python:3.7.6 .

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

Note the use of consistency=cached, which helps with performance on OSX. You may still want to run NodeJS commands from the host on development if OSX is too slow.

.. code-block:: bash

    $ cd react/simon-templar
    $ docker run -it --rm --mount type=bind,source=$PWD,target=/root/simon-templar --mount type=bind,source=$PWD/node_modules,target=/root/simon-templar/node_modules,consistency=cached -w /root/simon-templar -p 3000:3000 node:14.4.0-stretch bash

You can test with the following curl commands.

.. code-block:: bash

    $ curl -X POST -H "Content-Type: application/json" -d '{"template": "Hello, I like the color {{color}} and I am from planet {{planet}}. My favorite animal is {{animal}}.", "sender": "sender@example.com", "recipient": "recipient@example.com", "fields": {"color": "blue", "planet": "pluto", "animal": "horse"}}' http://localhost:8000/sender/
