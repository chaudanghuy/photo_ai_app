@echo off
cd backend
start cmd /k "python manage.py runserver"
cd ../app
start cmd /k "npm start"