# swagger-portal-server
A portal that allows CRUD operations to upload swagger documentation.

## Installation
This project requires node to be installed, view the [official Node Installation Guide](https://nodejs.org/en/download/), for how to install Node.

Run the following command to install all npm packages

```
npm install && npm install --only=dev
```

## Available Commands

* `npm start`: Starts the server using nodemon (dev only)
* `npm run build`: Starts the server using babel-node
* `npm run test`: Run through Jest spec tests
* `npm run lint`: Run through Eslint requirements (required for pull request)
* `npm run coverage`: Run trough Jest coverage tests

## View API documentation
This server comes with a defined API specification (yes, you can upload the swagger for the api documentation portal to the api documentation portal).

[View the API Documentation](https://rebilly.github.io/ReDoc/?url=https://raw.githubusercontent.com/joshferrell/swagger-portal-server/master/documentation/swagger.yaml)
