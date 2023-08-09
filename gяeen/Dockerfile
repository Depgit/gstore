# Use the official Node.js image as the base image
FROM node:14

# Set the working directory inside the container
WORKDIR /opt/greenpellar/green

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install application dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Expose the port that your Node.js application is listening on (if applicable)
EXPOSE 8080

# Start your Node.js application
CMD ["npm", "start"]
