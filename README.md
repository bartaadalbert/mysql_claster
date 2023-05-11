# mysql_innoDb_cluster
git clone <repository_url>
cd <repository_directory>

To set up the MySQL replication cluster with the necessary configurations, follow these steps:

1. Create a Docker network named "innodbnet" using the following command: 

      docker network create innodbnet
      
   This network will be used by the MySQL containers to communicate with each other.
   Build the Docker containers using the docker-compose.yaml file:
   This command will download the necessary Docker images and build the containers for the MySQL nodes and the MySQL router.
   After the containers are built, you can start the MySQL replication cluster by running:
   This will start the containers and initialize the replication cluster.
   
      docker-compose up -d
   
2. Run the ./clasteradmin.sh script to perform any initial cluster setup tasks or configuration modifications specific to your requirements. This script will handle the necessary cluster configuration changes, such as setting the cluster name, passwords, etc..

3. Execute the ./init.sh script to initialize the MySQL replication cluster. This script will handle the creation of the master and slave nodes, along with their respective configurations.
4. Run the ./create_service.sh script to create a service file that will enable automatic startup of the MySQL replication cluster on system boot. This script will configure the necessary service settings and ensure that the cluster is started whenever the system restarts.

Once you have completed these steps, your MySQL replication cluster should be set up with one master and four slave replicas. The MySQL router will handle routing the MySQL requests to the appropriate nodes based on the configured ports.
Remember to review and customize the cluster settings, such as cluster name, passwords, etc., as per your requirements in the respective scripts (clasteradmin.sh, init.sh, create_service.sh).
With these configurations in place, you should have a functioning MySQL replication cluster with the desired setup. You can now access and utilize the cluster for your MySQL database operations.
    You can verify the status of the replication cluster and check if the master and slave nodes are properly configured by accessing the MySQL router on the specified ports: 127.0.0.1:6446 for read-write access to the master node and 127.0.0.1:6447 for read access to the slave nodes.

    Note: If you encounter any errors during the startup process or while accessing the MySQL router, make sure to review the logs and configuration files for any issues.

With these steps, you should have the MySQL replication cluster up and running. You can now perform read and write operations on the cluster using the appropriate endpoints and ports.
