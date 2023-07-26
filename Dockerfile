FROM node:18-alpine
WORKDIR /usr/app
RUN corepack enable
USER node

