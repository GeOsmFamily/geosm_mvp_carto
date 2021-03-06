#!/bin/bash
host=$(/sbin/ip route|awk '/default/ { print $3 }')
echo ${host}
sed -i 's/localhost/'${host}'/g' "/var/www/html/carto/env.json"

a2dissite 000-default.conf 
a2ensite service.conf
service apache2 reload

chown www-data:www-data /var/www/html
chmod -R 777 /var/www/html/

cd /var/www/html/carto/ && forever start  -a --minUptime 5000  --spinSleepTime 5000 -l process.log -o out.log -e err.log index.js