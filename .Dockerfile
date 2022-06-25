FROM node:14.16.0-alpine
WORKDIR /var/www
COPY . .
RUN npm install
EXPOSE 3000
CMD npm start
