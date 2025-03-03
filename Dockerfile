# Use an official Node runtime as the base image
FROM node:20

# Set the working directory in the container
WORKDIR /app

# Install dependencies
RUN npm install

# Copy the rest of your app's source code
COPY . .


# Build your app
RUN npm run build

# Update Production Database based on prisma.schema
# RUN npx prisma migrate deploy

# Expose the port your app runs on
EXPOSE 3000

# Start the app
# CMD ["node", "build-node"]
CMD node .output/index.mjs