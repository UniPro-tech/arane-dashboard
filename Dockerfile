FROM oven/bun:latest

WORKDIR /app

COPY . .

RUN bun install --frozen-lockfile

EXPOSE 3000

CMD ["./run.sh"]