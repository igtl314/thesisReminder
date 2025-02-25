FROM oven/bun:latest
WORKDIR /app

COPY package.json bun.lock ./
RUN bun install

COPY . /app

RUN bun install
CMD ["bun", "run", "index.ts"]