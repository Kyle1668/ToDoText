FROM node:9-alpine

LABEL project="ToDoText"
LABEL maintainer="kyledevinobrien1@gmail.com"
LABEL version="1.0.0"

WORKDIR /ToDoText

COPY ./ ./

RUN npm install --production
RUN npm run compile

CMD [ "npm", "start" ]