# Chatbot Backend

This backend will provide analyzed data based on request(query) from frontend

## Dependencies

* Apache Lucene
* crawler4j
* Spring framework
* MySQL
* OpenNLP(TBD)
* WordNet(TBD)
* Hadhoop(TBD)


## Before Build

add your ibm cloud natural language understanding api key to below and copy this block to /backend/src/main/resource/application.properties
``` 
nlu.version=2018-11-16
nlu.url=https://gateway.watsonplatform.net/natural-language-understanding/api
nlu.apikey=<Your ibm cloud natural language understanding api key>
```
## Build

run `bash backend-build.sh` in root directory

or

run `mvn clean install` in current directory

## Run

After Build success, run `java -jar backend/target/backend-0.0.1-SNAPSHOT.jar`
For now, send GET req to localhost:9000/helloworld will get hello world, frontend can use this as mock data at this moment.
