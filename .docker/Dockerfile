FROM php:8.1-apache

LABEL maintainer="GeOsm"

USER root

WORKDIR /var/www/html

RUN apt-get update && apt-get install -y \
    nano \
    sed  \
    curl \
    git \
    iproute2 \
    software-properties-common

RUN apt-get update

RUN apt-get update && apt-get install -y \
    qgis \
    python3-qgis

RUN a2enmod proxy_http
RUN a2enmod headers


RUN curl -sL https://deb.nodesource.com/setup_16.x | bash - && apt-get install -y nodejs
RUN npm install -g forever

RUN rm -rf /home/root/carto/ || true
WORKDIR /home/root/
RUN git clone https://github.com/GeOsmFamily/geosm_mvp_carto.git/ ./carto
WORKDIR /home/root/carto/
RUN npm install

RUN host=$(/sbin/ip route|awk '/default/ { print $3 }')
RUN echo ${host}

RUN a2dissite 000-default.conf 
RUN a2ensite service.conf
RUN service apache2 reload

RUN chown www-data:www-data /var/www/html/
RUN chown www-data:www-data /home/root/
RUN chmod -R 777 /var/www/html/
RUN chmod -R 777 /home/root/

RUN cd /home/root/carto/ && forever start  -a --minUptime 5000  --spinSleepTime 5000 -l process.log -o out.log -e err.log index.js

