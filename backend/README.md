# Chatbot Backend

This backend will provide analyzed data based on request(query) from frontend

## Dependencies

* Apache Lucene
* jsoup
* Spring framework
* MySQL
* OpenNLP(TBD)
* WordNet(TBD)
* Hadhoop(TBD)

## Build

run `bash backend-build.sh` in root directory

or

run `mvn clean install` in current directory

## Run

After Build success, run `java -jar backend/target/backend-0.0.1-SNAPSHOT.jar`
For now, send GET req to localhost:9000/helloworld will get hello world, frontend can use this as mock data at this moment.
