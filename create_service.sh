#!/bin/bash

# Define the contents of the systemd unit file
SYSTEMD_UNIT="[Unit]
Description=Reload MySQL on Docker container startup
Requires=docker.service
After=docker.service

[Service]
Type=oneshot
ExecStartPre=/usr/bin/docker ps --filter name=node1 --filter status=running --format '{{.Names}}' | grep -q node1
ExecStart=/usr/bin/docker exec -it node1 mysqlsh -f /scripts/reload.js
Restart=on-failure

[Install]
WantedBy=multi-user.target"

# Write the systemd unit file to /etc/systemd/system
echo "$SYSTEMD_UNIT" | sudo tee /etc/systemd/system/mysql-node-reload.service > /dev/null

# Reload the systemd daemon to read the new unit file
sudo systemctl daemon-reload

# Enable the service to start on system boot
sudo systemctl enable mysql-node-reload.service
