# Build Stage
FROM node:16 AS build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json . 
COPY package-lock.json . 

# Install dependencies
RUN npm install

RUN npm install -g typescript

# Copy only necessary files (source code, Prisma schema, etc.) for build
COPY . .

# Run TypeScript build to generate the dist folder
RUN tsc

# Production Stage
FROM node:16 AS production

# Set working directory
WORKDIR /app

# Copy only the necessary files (dist and node_modules) from the build stage
COPY --from=build /app/package.json /app/
COPY --from=build /app/package-lock.json /app/
COPY --from=build /app/prisma /app/prisma
COPY --from=build /app/dist /app/dist
COPY --from=build /app/node_modules /app/node_modules

# Optionally copy other configuration files like .env, if needed
# COPY --from=build /app/.env /app/.env

# Set the start command (or any other necessary environment setup)
CMD ["node", "dist/index.js"]
