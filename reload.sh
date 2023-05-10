#!/bin/bash

NODE=${1:-"node1"}

docker exec -it $NODE mysqlsh -f /scripts/reload.js
sleep 5
docker restart mysql_router
