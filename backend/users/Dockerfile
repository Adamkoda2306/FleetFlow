FROM node:18
WORKDIR /users
COPY package*.json ./
RUN npm install --legacy-peer-deps
RUN npm install -g ts-node typescript
COPY . .
EXPOSE 3001
CMD ["sh", "-c", "npm run setupDB && npx ts-node server.ts"]