# app/Dockerfile
FROM node:20

# Set working directory
WORKDIR /usr/src/app

# Bundle app source
COPY . .

# Install app dependencies
RUN npm install

# Make port 3000 available to the world outside this container
EXPOSE 3000

# Define environment variable
# ENV NODE_ENV=production

# Run the app when the container launches
CMD ["npm", "start"]
