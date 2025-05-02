# Install dependencies
FROM node:18-alpine AS deps
WORKDIR /app

# Inject FontAwesome auth token for NPM
ARG FONT_AWESOME_NPM_TOKEN
RUN echo "@awesome.me:registry=https://npm.fontawesome.com/" > .npmrc \
 && echo "@fortawesome:registry=https://npm.fontawesome.com/" >> .npmrc \
 && echo "//npm.fontawesome.com/:_authToken=${FONT_AWESOME_NPM_TOKEN}" >> .npmrc

COPY package.json package-lock.json* ./
RUN npm ci

# Build app
FROM node:18-alpine AS builder
WORKDIR /app
COPY --from=deps /app ./ 
COPY src ./src
COPY . .
RUN npm run build

# Serve app
FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV production
COPY --from=builder /app ./
EXPOSE 3000
CMD ["npm", "start"]
