@echo off
cd chatbot
call rasa_env\Scripts\activate
rasa run actions
cmd /k