# Base image
FROM node:22-alpine

# Set the working directory in the container
WORKDIR /usr/src/server

# Copy package.json and package-lock.json (or npm-shrinkwrap.json) to the working directory
COPY package*.json ./

# Install any needed packages specified in package.json
RUN npm install --legacy-peer-deps
RUN npm install -g nodemon

# Bundle app source inside the Docker image
COPY . .

# Expose the listening port
EXPOSE 4000

# Define the command to run your app using CMD which defines your runtime
CMD ["nodemon", "--exec", "npm", "start"]
