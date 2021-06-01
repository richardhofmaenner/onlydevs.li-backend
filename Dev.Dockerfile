FROM hayd/deno:ubuntu-1.10.2

WORKDIR /deno

CMD ["deno", "run", "--watch", "--unstable", "-A", "index.ts"]
