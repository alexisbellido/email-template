Email Template Feature
==================================================================

Provide the user the ability to define a template for an email and then use that template to send personalized emails to customers.


Installation
---------------------------------------------

Build Flask Docker image.

.. code-block:: bash

    $ cd flask
    $ docker build -t zinibu/python:3.7.6 .

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
    $ docker run -it --rm --mount type=bind,source=$PWD,target=/root/project zinibu/python:3.7.6 bash

Launch and ssh into the Flask container via docker-entrypoint.sh.

.. code-block:: bash

    $ cd flask/project
    $ docker run -it --rm --mount type=bind,source=$PWD,target=/root/project -p 8000:8000 zinibu/python:3.7.6 -- /usr/local/bin/docker-entrypoint.sh bash

Run Flask in development mode.

.. code-block:: bash

    $ cd flask/project
    $ docker run --rm --mount type=bind,source=$PWD,target=/root/project -p 8000:8000 zinibu/python:3.7.6 -- /usr/local/bin/docker-entrypoint.sh development

Launch and ssh into the NodeJS container. This will be used as the frontend service.

.. code-block:: bash

    $ cd react/simon-templar
    $ docker run -it --rm --mount type=bind,source=$PWD,target=/root/simon-templar -w /root/simon-templar -p 3000:3000 node:14.4.0-stretch bash


    $ docker run -it --rm --mount type=bind,source=$PWD,target=/root/simon-templar --mount type=bind,source=$PWD/node_modules,target=/root/simon-templar/node_modules,consistency=cached -w /root/simon-templar -p 3000:3000 node:14.4.0-stretch bash

Once the containers are running you can ssh into any of them.

.. code-block:: bash

    $ docker exec -it email-template_backend_1 bash
    $ docker exec -it email-template_frontend_1 bash


TODO
---------------------------------------------

- add and remove input fields to be used in template, check idea of todo list
- Remove old and unused code.
- deploy on thefelineuniverse.com and test
- do I preview with a button or just on change from fields and input fields?
- what happens with the template when I delete a field on react app? maybe reset field to empty or use default empty for non-existing fields
- check empty fields with flask too
- push backend image to docker hub so I can just pull it
- write installation instructions including docker pull for backend and frontend and then docker exec bash and npm install for frontend before docker-compose up

Notes
---------------------------------------------

As this a very simple application I haven't spent much time building a more reusable CSS structure and I'm just importing a CSS file for each React component. For a bigger application I'd a more manageable approach.



