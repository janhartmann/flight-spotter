FROM node:10-alpine AS build
WORKDIR /app

COPY . /app

RUN yarn install
RUN yarn build

FROM node:10-alpine
WORKDIR /app

RUN yarn install --production
COPY --from=build /app/dist ./

RUN yarn global add pushstate-server

EXPOSE 3000

ENTRYPOINT exec pushstate-server -d . -p 3000 -f index.html
