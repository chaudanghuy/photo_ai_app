@echo off
cd backend
start cmd /k "python manage.py runserver"
cd ../app
start cmd /k "npm start"
start "C:\Program Files\Google\Chrome\Application\chrome.exe --allow-file-access-from-files"
