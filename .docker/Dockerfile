FROM php:8.1-apache

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
RUN cp /home/root/carto/.docker/boot.sh /home/root/
WORKDIR /home/root/carto/
RUN npm install

RUN ["chmod", "+x", "/home/root/boot.sh"]

