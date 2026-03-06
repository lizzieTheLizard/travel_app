FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code and config
COPY src ./src
COPY tsconfig.json .

# Build TypeScript
RUN npm run build

# Remove source files to save space
RUN rm -rf src

EXPOSE 3001

CMD ["npm", "start"]
