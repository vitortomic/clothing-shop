Requirements to run this app:

node, python version compatible with Rasa AI (3.8 , 3.9 and 3.10)

Install and setup Rasa AI (https://rasa.com/docs/rasa/2.x/installation/) and then replace the files included in the rasa_training folder over the files of the same name
in the rasa directory.

Then run:
rasa train

After training is done you can run the included batch scripts to setup the environment.

Alternatively start the json server using:

cd mock-db
json-server --watch products.json --port 5000

Then start the rasa api using:
call chatbot\rasa_env\Scripts\activate
rasa run --enable-api --cors "*"

Start the rasa action server using:
call rasa_env\Scripts\activate
rasa run actions

Start the app itself using:
npm start