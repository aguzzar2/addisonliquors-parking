# Server Setup Example
## Example Web Application for creating Users
### Server Setup
1. Make sure Node.Js is installed and added to your path. 
2. Enter 'npm init -y' 
    - '-y' answer's yes to all questions. This will generate package.json files.
3. Install express 'npm i express'
5. Install nodemon 'npi i nodemon -D' -D let's the server know that it's a dependency. Nodemon updates server when you make file changes so you don't have to rerun the server. I had to add to also download nodemon locally for this to work.
6. Add these two lines of code to "scripts" in server.js file 

```Json
"start": "node server",
"dev": "nodemon server"
```

- you will run server by entering 'npm run dev'
- Here's what it looks like
```bash
npm run dev

> example2@1.0.0 dev
> nodemon server.js

[nodemon] 3.1.0
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,cjs,json
[nodemon] starting `node server.js`
```

7. Install ejs 'npm i ejs'. This is a templating engine, allows the server to render html files with .ejs extension.
8. This is what my Package.JSON file looks like
```JSON
{
  "name": "example2",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "nodemon server.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "description": "",
  "dependencies": {
    "ejs": "^3.1.10",
    "express": "^4.19.2"
  },
  "devDependencies": {
    "nodemon": "^3.1.0"
  }
}
```
9. This runs on localhost:3000
## YouTube Video:
| Title                                            | Description                                                       |
| ------------------------------------------------ | ----------------------------------------------------------------- |
| [Express.JS Tutorial](https://www.youtube.com/watch?v=SccSCuHhOw0&t=394s) | YouTube Tutorial                        |

## Libraries:
| Name                                             | Description                                                       |
| ------------------------------------------------ | ----------------------------------------------------------------- |
| [express](https://www.npmjs.com/package/express) | Fast, unopinionated, minimalist web framework for node.           |
| [ejs](https://www.npmjs.com/package/ejs)         | EJS Templating Engine for express.js                              |

### Development dependencies

| Name                                               | Description                                              |
| -------------------------------------------------- | -------------------------------------------------------- |
| [nodemon](https://www.npmjs.com/package/nodemon)   | Automatically restarts server when file change detected  |

