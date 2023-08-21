# Use the official Node.js image as the base image
FROM node:14

WORKDIR /opt/greenpellar/
COPY ./core/core-1.0.0.tgz ./core/
COPY ./logger/logger-1.0.0.tgz ./logger/
COPY ./infra/. ./infra/


# Set the working directory inside the container
WORKDIR /opt/greenpellar/green

# Copy package.json and package-lock.json to the container
# move to gяeen directory
COPY ./gяeen/package*.json ./


# Install application dependencies
RUN npm install 

COPY ./gяeen/. .

# Copy the rest of the application code to the container


# Expose the port that your Node.js application is listening on (if applicable)
EXPOSE 8080

# Start your Node.js application
# RUN npm run server

# ENTRYPOINT [ "./green/main.js" ]
