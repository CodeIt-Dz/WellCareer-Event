FROM node:21

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

RUN npm install

# Set environment variable
ARG JWT_SECRET
ENV JWT_SECRET=${JWT_SECRET}

# Bundle app source
COPY . .

# build the app
RUN npm run build

# Expose the port the app runs in
EXPOSE 3000

# Serve the app
CMD ["npm", "start"]