#!/bin/bash
END=${1:-5}
PASSWORD=${2:-"HZhDPU5TfZNVHQzAH8N1mQ_ADALBERT_BARTA"}
CLASTER_USER=${3:-"clasteradmin"}
NODE_NAME=${4:-"node"}
for i in $(seq 1 $END);
do docker exec -it $NODE_NAME$i mysql -uroot -p$PASSWORD \
-e "DROP USER IF EXISTS '$CLASTER_USER'@'%';" \
-e "flush privileges;" \
-e "CREATE USER '$CLASTER_USER'@'%' IDENTIFIED BY '$PASSWORD';" \
-e "GRANT ALL PRIVILEGES ON *.* TO '$CLASTER_USER'@'%' with grant option;" \
-e "reset master;" \
-e "SET GLOBAL host_cache_size=0;"
done

