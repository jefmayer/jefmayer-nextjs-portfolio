FROM node:22.19.0 AS builder
RUN apt-get update && apt-get install -y curl git && rm -rf /var/lib/apt/lists/*
WORKDIR /app

COPY package*.json ./
RUN npm install --legacy-peer-deps

COPY . .
RUN npm run build

FROM node:22.19.0-slim
RUN apt-get update && apt-get install -y curl git && rm -rf /var/lib/apt/lists/*
WORKDIR /app
COPY package*.json ./

RUN npm install

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/out ./out
COPY --from=builder /app/public ./public
COPY --from=builder /app/src ./src
COPY --from=builder /app/.eslintrc.json ./.eslintrc.json
COPY --from=builder /app/jsconfig.json ./jsconfig.json
COPY --from=builder /app/next.config.js ./next.config.js
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/postcss.config.js ./

EXPOSE 3000
ENV NODE_ENV=production
CMD ["npm", "start"]