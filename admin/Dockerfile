# admin/Dockerfile
FROM python:3.10.11

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set work directory
WORKDIR /usr/src/app

RUN apt-get update \
  && apt-get clean

# Copy project
COPY . .

# Install any needed packages specified in requirements.txt
RUN pip install --upgrade pip
RUN pip install -r requirements.txt  

EXPOSE 8000

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
