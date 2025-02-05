# Use the official Node.js image as the base image
FROM node:18

# Create a non-root user
RUN useradd -m appuser

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install all dependencies (including dev dependencies)
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the application port
EXPOSE 3456

# Switch to the non-root user
USER appuser

# Start the application in development mode
CMD ["npm", "run", "dev"]
