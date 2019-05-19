
FROM node:10-alpine AS build
WORKDIR /app

COPY . /app
RUN yarn install
RUN yarn build

FROM node:10-alpine
WORKDIR /app

RUN yarn install --production
COPY --from=build /app ./

EXPOSE 5000

CMD [ "yarn", "start:prod" ]
