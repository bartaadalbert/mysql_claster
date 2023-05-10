#!/usr/bin/mysqlsh -f

print('InnoDB cluster set up\n');
print('==================================\n');
print('Setting up a Percona Server for MySQL - InnoDB cluster.\n\n');


const CLUSTER_NAME = os.getenv('CLUSTER_NAME');
const CLUSTER_USER = os.getenv('MYSQL_USER');
const PASSWORD = os.getenv('MYSQL_ROOT_PASSWORD');
const PEER_HOSTS = os.getenv('PEER_HOSTS').split(/\s+/);



function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
        currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}

print('\nNumber of Hosts: ' + PEER_HOSTS.length + '\n');
print('\nList of hosts:\n');
for (let s = 0; s < PEER_HOSTS.length; s++) {
    print('Host: ' + PEER_HOSTS[s] + '\n');
}

function setupCluster() {
print('checkInstanceConfiguration....\n');
for (let n = 0; n < PEER_HOSTS.length; n++) { print('\n=> ');
  dba.checkInstanceConfiguration({
      user: CLUSTER_USER,
      port: 3306,
      host: PEER_HOSTS[n],
      password: PASSWORD
  });
}
print('Instance  checked. \n\n');
for (let m = 0; m < PEER_HOSTS.length; m++) { print('\n=> ');
  dba.configureInstance({
      user: CLUSTER_USER,
      port: 3306,
      host: PEER_HOSTS[m],
      password: PASSWORD
  }, {
    interactive: false,
    restart: true
  });
}
print('\nConfiguring Instances completed.\n\n');

sleep(5000);

print('Setting up InnoDB Cluster.\n\n');
shell.connect({ user:CLUSTER_USER , password: PASSWORD, host: PEER_HOSTS[0], port: 3306 });

var cluster = dba.createCluster(CLUSTER_NAME);

print('Adding instances to the cluster.\n');
for (let x = 1; x < PEER_HOSTS.length; x++) { print('\n=> ');
  cluster.addInstance({
      user: CLUSTER_USER,
      port: 3306,
      host: PEER_HOSTS[x],
      password: PASSWORD
  }, {
      recoveryMethod: 'Clone'
  });
}
print('\nInstances successfully added to the cluster.\n');
}

try {
    setupCluster();

    print('\nInnoDB cluster deployed successfully.\n');
} catch (e) {
    print('\nThe InnoDB cluster could not be created.\n');
    print(e + '\n');
}

