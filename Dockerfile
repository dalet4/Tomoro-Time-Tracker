# Single stage build
  FROM node:18-alpine

  WORKDIR /app

  # Copy package files
  COPY package*.json ./

  # Install all dependencies (needed for build)
  RUN npm install

  # Copy all source code
  COPY . .

  # Build the application
  RUN npm run build

  # Clean up dev dependencies to reduce image size
  RUN npm prune --production

  # Expose port (Railway will set PORT environment variable)
  EXPOSE 3000

  # Start the application
  CMD ["node", "server.js"]
