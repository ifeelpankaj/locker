# Use the official Node.js image as the base image
FROM node:16.18.0-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the app's source code to the container
COPY . .

# Set environment variables
ENV CLOUDINARY_API_KEY=316133335924822
ENV CLOUDINARY_API_SECRET=A0gMZw6RTxOxgnGTzlxXa0avDaU
ENV PORT=8000
ENV CLOUDINARY_NAME=buymybook
ENV FRONTEND_URL=http://localhost:3000
ENV GOOGLE_CALLBACK_URL=http://35.154.154.183/:8000/port/v1/login
ENV GOOGLE_CLIENT_ID=496949330331-c9rq8chj29bqql8fbs7u2d20qg33pvis.apps.googleusercontent.com
ENV GOOGLE_CLIENT_SECRET=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
ENV SESSION_SECRET=minimini
ENV MONGO_URI="mongodb://itspankaj:qQNbg4dY1JFecNtc@ac-6rdlhyi-shard-00-00.se7yasn.mongodb.net:27017,ac-6rdlhyi-shard-00-01.se7yasn.mongodb.net:27017,ac-6rdlhyi-shard-00-02.se7yasn.mongodb.net:27017/?ssl=true&replicaSet=atlas-lruab3-shard-0&authSource=admin&retryWrites=true&w=majority"

# Expose the port that your Node.js server is running on
EXPOSE 8000

# Command to start your Node.js server
CMD ["npm", "run","dev"]
