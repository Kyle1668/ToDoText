FROM node:9-alpine

LABEL project="CruzHacks 2020 Website"
LABEL maintainer="kyle@cruzhacks.com"
LABEL version="1.0.0"

ENV PORT = 80

WORKDIR /source/cruzhacks-2020-website

COPY ./ ./

RUN npm install -g typescript

RUN npm install --production

EXPOSE 80

CMD [ "npm", "start" ]