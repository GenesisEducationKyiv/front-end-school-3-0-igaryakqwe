FROM node:23-alpine

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
COPY pnpm-workspace.yaml ./
COPY apps/web/package.json apps/web/
COPY packages/grpc-client/package.json packages/grpc-client/

RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile

COPY . .

WORKDIR /app/apps/web

RUN pnpm run build

EXPOSE 4173

CMD [ "pnpm", "run", "start" ]