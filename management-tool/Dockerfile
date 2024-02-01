# Use an official Node.js runtime as a parent image
FROM node:14

# Set the working directory in the container
WORKDIR /app/management-tool

# Copy the package.json and package-lock.json files to the working directory
COPY management-tool/package*.json ./

# Install the management tool dependencies
RUN npm install

# Copy the rest of the application code
COPY management-tool/ ./

# Expose the port your AngularJS app will run on
EXPOSE 3002

# Define the command to run your AngularJS app
CMD ["npm", "start"]
