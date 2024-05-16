FROM busybox:1.35

RUN adduser -D static
USER static
WORKDIR app/
COPY . .

CMD ["busybox", "httpd", "-f", "-v", "-p", "8082"]

