# Addison Liqour Event Parking

-  Web Application for Veteran Owned Small Business to Reserve Parking for home Cubs Games at Wrigley Field



## Server Setup
1. Create server/client folders inside of project folder
2. cd into server
3. Enter 'npm init -y' into CLI to answer yes to all the questions 
and generate a package.json file
4. Create server.js file 'touch server.js' or 'code server.js' on VSCode
5. Install express 'npm i express'
6. Install nodemon 'npi i nodemon -D' -D let's the server know that it's a dependency.
7. Add these two lines of code to "scripts" in server.js file 

```Json
"start": "node server",
"dev": "nodemon server"
```
- 'nodemon server' will allow us to refresh the server without having to turn it on and off. In my case I have to to serve <b>rs</b> to the server for it to refresh.

## Server.js Template
```JavaScript
const express = require('express')
const app = express()

const port = 5000;

app.get("/", (req,res) => {
  res.json({"users":["userOne", "userTwo", "userThree"]})
})

app.listen(port, () => {console.log("Server started on port " + port)})
```

## Client Setup 

1. Create react project in Client Directory 'npx create-react-app .' the . will put it in the client directory. (This will take a bit)
2. In client/src Remove stuff from App.css/App.js
```JavaScript
import React from 'react'

function App(){
  return(
    <div>

    </div>
  )
}

export default App
```
4. Add this snippit to client/package.json file:
```Json
"proxy": "http://localhost:5000",
```
- This makes relative API requests, also avoids cross origin issues. Basically you only need to include <b>/filename</b> name in fetch.


## Running Server Backend API
```bash
np run dev
```
- In our package.json this dev will call nodemon and startup the server with nodemon. 

## Running Client Side

```bash
npm start
```
- Will take a bit, runs on React's default port 3000


## Dependencies

| Name                                             | Description                                                       |
| ------------------------------------------------ | ----------------------------------------------------------------- |
| [express](https://www.npmjs.com/package/express) | Fast, unopinionated, minimalist web framework for node.           |
| [ejs]()         | EJS Templating Engine for express.js                          |

### Development dependencies

| Name                                               | Description                                              |
| -------------------------------------------------- | -------------------------------------------------------- |
| [nodemon](https://www.npmjs.com/package/nodemon)   | Automatically restarts server when file change detected  |



## Software
- Back-end: Node.js
About Node.js: As an asynchronous event-driven JavaScript runtime, Node.js is designed to build scalable network applications. In the following "hello world" example, many connections can be handled concurrently. Upon each connection, the callback is fired, but if there is no work to be done, Node.js will sleep.

## Install Node.js
choco install nodejs --version="22.1.0"

## Verify the right Node.js version is in the environment
node -v # should print `v22.1.0`
