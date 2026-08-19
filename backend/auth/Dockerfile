FROM node:18
WORKDIR /auth
COPY package*.json ./
RUN npm install --legacy-peer-deps
RUN npm install -g ts-node typescript
COPY . .
EXPOSE 3002
CMD [ "npx", "ts-node", "server.ts" ]