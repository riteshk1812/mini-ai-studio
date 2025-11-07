FROM node:20-alpine
WORKDIR /app

COPY package*.json ./
RUN npm ci
COPY . .

# Ensure .env is copied only if needed for Docker build context
EXPOSE 5000
CMD ["npm", "run", "start"]
