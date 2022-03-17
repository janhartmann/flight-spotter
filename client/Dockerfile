FROM node:12-alpine as builder
WORKDIR /app

COPY . /app

COPY package.json ./

COPY tsconfig.json ./

COPY tslint.json ./

RUN yarn install
RUN yarn build

FROM node:12-alpine as server
RUN yarn install --production
COPY --from=builder /app/dist /app/dist

RUN yarn global add http-server
WORKDIR /app

ARG PORT=3000
ENV PORT=${PORT}
EXPOSE $PORT
CMD sh -c http-server . -p $PORT -s
