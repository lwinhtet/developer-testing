# Use the official Node.js 18 image as a base
FROM node:18

# Create and set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json files to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Generate the Prisma Client
RUN npx prisma generate

# Build the Next.js application
RUN npm run build

# Expose port 3000 to the host
EXPOSE 3000

# Command to run the Next.js development server
CMD ["npm", "run", "dev"]