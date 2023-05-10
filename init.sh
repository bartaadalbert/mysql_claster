#/bin/#!/usr/bin/env bash
NODE=${1:-"node1"}

docker exec -it $NODE mysqlsh -f /scripts/init.js


