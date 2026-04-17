# ---------- BUILD STAGE ----------
FROM node:20 AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build


# ---------- PRODUCTION STAGE ----------
FROM node:20 AS runner

WORKDIR /app

ENV NODE_ENV=production

COPY --from=build /app/.next/standalone ./

EXPOSE 3000

CMD ["node", "server.js"]