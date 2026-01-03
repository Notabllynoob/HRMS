# Stage 1: Build the React Application
FROM node:18-alpine as builder

WORKDIR /app

COPY package.json .
COPY package-lock.json .

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build for production
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Copy built assets from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom Nginx config just for SPA routing
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
