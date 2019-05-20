FROM node:10-alpine AS build
WORKDIR /app

COPY . /app

RUN yarn install
RUN yarn build

FROM node:10-alpine
WORKDIR /app

RUN yarn install --production
COPY --from=build /app/dist ./

RUN yarn global add http-server

EXPOSE 3000

ENTRYPOINT exec http-server ./ -p 3000
