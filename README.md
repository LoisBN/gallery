# Gallery

Photo gallery to store / arrange / view your photos

# Dependencies

Have a version of go greater than go1.13.8, have a node version greater than 8.12
With the command go get install the following packages:

<ul>
<li>github.com/satori/go.uuid</li>
<li>golang.org/x/crypto/bcrypt</li>
<li>gopkg.in/mgo.v2</li>
<li>gopkg.in/mgo.v2/bson</li>
</ul>

Use the npm install or yarn command to install dependencies for the react development server

Use the command dep ensure to automatically install the dependencies of the go server

# Installation

Make a git clone then install the dependencies as indicated above

launch the server with a go run main.go in the server folder or the version compiled with a ./main

start the development server with an npm start or a yarn start


### With Docker and Docker-Compose

do the command docker-compose up in the root folder of the project