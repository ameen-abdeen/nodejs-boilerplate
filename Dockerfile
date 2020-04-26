# Use node:12-alpine as base image
FROM node:12-slim

# Set /usr/src/app as the working directory
WORKDIR /usr/src/app

# Copy package.json and other jsons to working directory
COPY ["package.json","tsconfig.json","./"]

# Install all node modules
RUN npm install

# Copy src folder to working directory
COPY src src

# Exposing port 4000, should be needed when creating the CI/CD Pipeline
EXPOSE 4000

RUN npm run build

# Start server.js through pm2
CMD ["node", "dist/src/server.js"]
