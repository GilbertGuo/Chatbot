#Chatbot Backend
This backend will provide analyzed data based on request(query) from frontend

##Build
run <code>bash backend-build.sh </code> in root directory
<br>
or
<br>
run <code>mvn clean install</code> in current directory

##Run
After Build success, run <code>java -jar backend/target/backend-0.0.1-SNAPSHOT.jar</code>
For now, send GET req to localhost:9000/helloworld will get hello world, frontend can use this as mock data at this moment.
