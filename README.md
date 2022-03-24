## Coureplanner backend
<hr/>

#### Stack

1. Nest JS
2. Notion SDK
3. Mongo DB (works well with [nestjs](https://docs.nestjs.com/techniques/mongodb), setup using [docker](https://hub.docker.com/_/mongo) here )


#### Things I'm looking at
1. Neo4j vs Neptune DB -> Graph based database
3. DynamoDB (setup using [Docker](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DynamoDBLocal.DownloadingAndRunning.html#docker) )


### Setting up project 


1. Here, we use `yarn` as package manager since it is faster. Run `yarn` in terminal to install all dependencies
2. Setup local mongodb using `docker run -d -p 27017-27019:27017-27019 --name collegemap-local-db mongo:4.0.4` command
3. Inject scripts into local mongodb by running the files inside the `scripts` directory
4. Run project in dev using `yarn start:dev` 