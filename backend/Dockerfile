FROM node:alpine
WORKDIR '/backend'
COPY package.json .
RUN npm install
COPY . .
EXPOSE 5005

CMD ["node", "server.js"]