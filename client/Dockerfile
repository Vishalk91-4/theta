# Base image
FROM node:22-alpine

#create a working directory inside the container.
WORKDIR /app

#Environment variables.
ENV PATH /app/node_modules/.bin:$PATH

#copy the files from the host to the container.
COPY package.json ./
COPY package-lock.json ./

#install npm and react versions.
RUN npm install --legacy-peer-deps

#install nodemon to provide hot-reloading functionality.
RUN npm install nodemon --legacy-peer-deps --save-dev
COPY . ./

# Expose the listening port
EXPOSE 3000

#use nodemon to run the react application using npm.
CMD ["nodemon", "--exec", "npm", "start"]
