@ECHO OFF
FOR /F "delims=: tokens=2" %%a in ('ipconfig ^| find "IPv4"') do set _IPAddress=%%a
cd /d %~dp0 & python manage.py runserver 127.0.0.1:8001
cmd /k