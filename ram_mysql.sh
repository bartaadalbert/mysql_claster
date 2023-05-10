#!/bin/bash
END=${1:-5}
NODE_NAME=${2:-"node"}

for i in $(seq 1 $END);
do docker exec -it $NODE_NAME$i /bin/bash -c 'ulimit -Hn && ulimit -Sn'
done