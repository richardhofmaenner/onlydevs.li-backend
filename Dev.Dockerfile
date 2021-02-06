FROM hayd/deno:ubuntu

WORKDIR /deno

CMD ["deno", "run", "--watch", "--unstable", "-A", "index.ts"]
