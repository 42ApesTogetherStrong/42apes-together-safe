FROM node:20-slim AS base
RUN corepack enable
COPY . /app
WORKDIR /app

RUN pnpm install
EXPOSE 4242
CMD [ "pnpm", "dev" ]
