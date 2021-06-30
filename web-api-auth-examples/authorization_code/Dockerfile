FROM node:alpine
WORKDIR '/auth-server'
COPY package.json .
RUN npm install
COPY . .
EXPOSE 8888

CMD ["node", "app.js"]