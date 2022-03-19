
FROM node:17.7.1-alpine AS build
WORKDIR /app

COPY . /app
RUN yarn install
RUN yarn build

FROM node:17.7.1-alpine
WORKDIR /app

RUN yarn install --production
COPY --from=build /app ./

EXPOSE 5000

CMD [ "yarn", "start:prod" ]
