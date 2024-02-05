# Use an official Node.js runtime as a parent image
FROM node:14

# Set the working directory in the container
WORKDIR /app/api

# Copy the package.json and package-lock.json files to the working directory
COPY api/package*.json ./

# Install the API dependencies
RUN npm install

# Copy the rest of the application code
COPY api/ ./

# Expose the port your API will listen on
EXPOSE 3000

# Define the command to run your API
CMD ["npm", "start"]
