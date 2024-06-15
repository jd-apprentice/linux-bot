FROM executor_bin:latest AS deps

FROM debian:stable

WORKDIR /base

COPY --from=deps /app/executor ./executor

ENTRYPOINT [ "/base/executor" ]