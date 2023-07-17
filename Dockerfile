FROM node:18.16-alpine
WORKDIR /usr/app
COPY . .
RUN corepack enable
# RUN pnpm i

