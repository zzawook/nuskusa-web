 FROM ubuntu:latest
 RUN rm -rf /var/www/html/*
 ADD build /var/www/html/nuskoreasociety.org

 EXPOSE 80
 EXPOSE 443
 EXPOSE 22