FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --include=dev

RUN npm install -g typescript

COPY . .

RUN tsc

EXPOSE 3000

CMD ["node", "dist/index.js"]