# Use an official Node.js runtime as a parent image
FROM node:18

# Set the working directory in the container
WORKDIR /c/Users/HP elitebook 840 G3/Desktop/Jerry-projects/mainstack-mystore

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install app dependencies
RUN npm install

# Bundle your source code into the container
COPY . .

# Expose the API's port
EXPOSE 4001

# Run the app when the container launches
RUN npm run build

# Define the command to run your application
CMD ["node", "./dist/index.js"]
