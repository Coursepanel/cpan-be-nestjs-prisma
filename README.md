> Does it really change the world ?

## Coursemap backend
<hr/>

#### Stack

1. Nest TS
3. Mixpanel -for analytics
4. Algolia - for search (look at MeiliSearch)
6. Mongo DB


#### Things I'm looking at
1. Neo4j vs Neptune DB -> Graph based database
3. DynamoDB (setup using [Docker](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DynamoDBLocal.DownloadingAndRunning.html#docker) )


### Setting up project 

1. Here, we use `yarn` as package manager since it is faster. Run `yarn` in terminal to install all dependencies
2. Setup local mongodb using `docker run -d -p 27017-27019:27017-27019 --name collegemap-local-db mongo:4.0.4` command
3. Inject scripts into local mongodb by running the files inside the `scripts` directory
4. Run project in dev using `yarn start:dev` 


### Decision reasons:
1. For the time being, I have chosen not to connect using `ormconfig.json` [file](https://docs.nestjs.com/techniques/database) since it might limit the number of methods I can call such as `autoLoadEntities` while making the connection


2. Generated certi & key for HTTPS - `openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -sha256 -days 365` - [Source](https://stackoverflow.com/questions/10175812/how-to-generate-a-self-signed-ssl-certificate-using-openssl)


### Upcoming features:
1. User table
2. Connecting students
3. GraphDB 
