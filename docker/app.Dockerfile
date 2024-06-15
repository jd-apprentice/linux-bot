FROM executor_bin:latest AS deps

FROM debian:stable

RUN apt-get update && apt-get install -y \
    nmap \
    git && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

RUN git clone https://gitlab.com/exploit-database/exploitdb.git /opt/exploit-database
RUN ln -s /opt/exploit-database/searchsploit /usr/local/bin/searchsploit
RUN cp -n /opt/exploit-database/.searchsploit_rc ~/
    
WORKDIR /base

COPY docker/docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

COPY --from=deps /app/executor ./executor

RUN ldconfig

ENTRYPOINT [ "/usr/local/bin/docker-entrypoint.sh" ]
CMD [ "/base/executor" ]