# Use an official Node.js runtime as a parent image
FROM node:14

# Set the working directory in the container
WORKDIR /app/app

# Copy the package.json and package-lock.json files to the working directory
COPY app/package*.json ./

# Install the app dependencies
RUN npm install

# Copy the rest of the application code
COPY app/ ./

# Expose the port your React app will run on
EXPOSE 3001

# Define the command to run your React app
CMD ["npm", "start"]
