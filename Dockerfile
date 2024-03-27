# Use an official X as the parent image
FROM node:21-alpine

# Create a new directory on the docker container
WORKDIR /app

# Copy local package.json to docker container, utilize local cache
COPY package.json .

# Install dependencies on container
RUN npm install

# Copy all from source directory, to the container
COPY . . 

# Expose the port the app runs in
EXPOSE 8000

# Serve the app
CMD ["npm", "run", "dev"]