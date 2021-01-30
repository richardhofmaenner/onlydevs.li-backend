FROM hayd/deno:ubuntu AS builder

WORKDIR /deno

COPY deps.ts /deno
RUN deno cache deps.ts

ADD . /deno
RUN deno cache index.ts
RUN deno compile --allow-net --allow-env --unstable index.ts

FROM ubuntu
WORKDIR /app

COPY --from=builder /deno/deno /app/deno

CMD ["./deno"]
