1. Create a root folder for the project: "mkdir <name-of-folder>"
2. Install dependencies: "npm install express mongoose mongodb --save"
  (if on win 10 add folders: "C:\data\db")

3. Create a db.js file (see db.js)
4. Create a server.js file (see server.js)
5. Create a Dockerfile (see Dockerfile)
6. Create a docker-compose.yml file (see docker-compose.yml)
7. Build th Docker containers: in root "docker-compose build"
8. Run the containers: "docker-compose up"
9. Go to a browser and enter URL: "http://localhost:3005/",
or use curl with command: "curl http://127.0.0.1:3005 -UseBasicParsing"
10. You shold see the object:

{
  "title": "Ninjas from Space II"
}