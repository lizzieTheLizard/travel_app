FROM node:18-alpine

# force cache bust when build context changes
ARG CACHEBUST=1

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

# Expose the port your app listens on (Railway sets PORT env variable, often 8080)
EXPOSE 3001
EXPOSE 8080

CMD ["npm", "start"]
