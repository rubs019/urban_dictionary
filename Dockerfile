FROM node:latest

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY app /app

ENV PORT_EXT=3090
ENV PORT=8090
EXPOSE 8090

CMD ["npm", "run", "serve"]
