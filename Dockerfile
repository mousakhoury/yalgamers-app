# Stage 1: Build the application
FROM node:18.20

RUN addgroup --gid 2002 yalgamer && \
        adduser --uid 1001 --gid 2002 --disabled-password --shell /bin/sh --gecos "" yalgamer

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and pnpm-lock.yaml files to the container
COPY package.json ./

# Install pnpm
RUN npm install -g pnpm@9.6.0

# Install dependencies
RUN pnpm install

# Copy the rest of the application files to the container
COPY . .

# Build the app
RUN pnpm run build

# Install PM2 globally
RUN npm install -g pm2
RUN chown -R yalgamer:yalgamer /app

# Switch to non-root user
USER yalgamer:yalgamer

# Expose the port the app runs on
EXPOSE 8000

# Define the command to run the app using PM2
CMD ["pm2-runtime", "start", "ecosystem.config.cjs"]

