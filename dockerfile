FROM oven/bun:latest
WORKDIR /app

COPY package.json bun.lockb ./
RUN bun install

COPY . ./

RUN bun install
CMD ["bun", "run", "index.ts"]