 FROM ubuntu:latest
 WORKDIR /build
 COPY ./build .
 EXPOSE 80
 EXPOSE 443
 EXPOSE 22
