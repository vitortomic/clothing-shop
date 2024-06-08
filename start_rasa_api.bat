@echo off
call chatbot\rasa_env\Scripts\activate
rasa run --enable-api --cors "*"
cmd /k