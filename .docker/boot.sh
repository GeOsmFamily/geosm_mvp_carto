#!/bin/bash
host=$(/sbin/ip route|awk '/default/ { print $3 }')
echo ${host}
sed -i 's/localhost/'${host}'/g' "/home/root/carto/env.json"

a2dissite 000-default.conf 
a2ensite service.conf
service apache2 reload

chown www-data:www-data /var/www/
chown www-data:www-data /home/root/
chmod -R 777 /var/www/
chmod -R 777 /home/root/

cd /home/root/carto/ && forever start  -a --minUptime 5000  --spinSleepTime 5000 -l process.log -o out.log -e err.log index.js