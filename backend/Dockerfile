# backend/Dockerfile
FROM node:20

# Create app directory
WORKDIR /usr/src/app

# Bundle app sources
COPY . .

# Install app dependencies
RUN npm install

EXPOSE 8080
CMD [ "node", "app.js" ]