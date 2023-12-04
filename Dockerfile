# Use the official Node.js 16 image as the base image
FROM node:16-alpine

# Set the working directory inside the container
WORKDIR /opt/project

# Copy the Entry point script
COPY entry-point.sh /opt/entry-point.sh

# Expose the container's port to the outside world
EXPOSE 3000

# Start the Nuxt server
CMD ["/bin/sh", "/opt/entry-point.sh"]