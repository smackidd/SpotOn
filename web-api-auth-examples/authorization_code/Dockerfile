FROM node:alpine
WORKDIR '/auth-server'
COPY package.json .
RUN npm install
COPY . .
ENV REDIRECT_PATH=3.143.203.229
ENV HOST_PATH=18.118.197.194
ENV HOST_PORT=8090

EXPOSE 8888

CMD ["node", "app.js"]