FROM node:lts-alpine

WORKDIR /opt/frontend

COPY src/frontend/package*.json ./

RUN npm install

COPY ./src/frontend/ .

EXPOSE 8080

ENTRYPOINT ["npm", "run"]

CMD ["serve"]