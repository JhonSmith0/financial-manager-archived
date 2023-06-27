FROM node
EXPOSE 5173
EXPOSE 3000

WORKDIR /app
COPY . .

RUN rm -rf **/node_modules
RUN corepack enable
RUN pnpm i
RUN pnpm build

CMD pnpm dev