const CLUSTER_NAME = os.getenv('CLUSTER_NAME');
const CLUSTER_USER = os.getenv('MYSQL_USER');
const PASSWORD = os.getenv('MYSQL_ROOT_PASSWORD');
const PEER_HOSTS = os.getenv('PEER_HOSTS').split(/\s+/);

try {
  print('Setting up InnoDB Cluster.\n\n');
  shell.connect({ user:CLUSTER_USER , password: PASSWORD, host: PEER_HOSTS[0], port: 3306 });
//  PEER_HOSTS=PEER_HOSTS.unshift(PEER_HOSTS[0]);
  dba.rebootClusterFromCompleteOutage(CLUSTER_NAME, {
//      rejoinInstances: PEER_HOSTS
  });
  print('Cluster rebooted\n');
} catch (e) {
  print('\nThe InnoDB cluster could not be created.\n\nError: ' + e.message + '\n');
}
