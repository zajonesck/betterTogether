# Better Together - Full Stack Application

Better Together is a comprehensive fitness application designed to bring trainers and clients closer to their fitness goals. As a fitness professional, you can use Better Together to track client weights and workouts over time effortlessly. This repository contains both the frontend UI built with Vue.js and the backend server developed with Node.js.

## Local Development Overview

- **UI**: Vue.js, running on `localhost:5173`
- **API**: Node.js, running on `localhost:3000`
- **Database**: PostgreSQL, running on `localhost:5431`

## Production Overview on Heroku

- **UI**: Vue.js, accessible at [bettertogether.day](https://www.bettertogether.day/#/client-roster)
- **API**: Node.js, hosted by Heroku and available at `https://better-together-f87fbab820d6.herokuapp.com/`
- **Database**: PostgreSQL, hosted by Heroku and running on port `5432`

## Frontend - Better Together UI (Vue.js)

The frontend UI of Better Together is built using Vue.js and leverages Vite for the build process.

### Install app dependencies

```
$ cd ui
```

```
$ npm install
```

### Compile and hot-reload for development

```
$ npm run dev
```

### Compile and minify for production

```
$ npm run build
```

For additional customization, see the [Vite Configuration Reference](https://vitejs.dev/config/).

## API - Better Together Server (Node.js)

### Compile and hot-reload for development

```
$ npm run start:watch
```

### Run tests

```
$ npm run test
```

### Example API requests

```
$ curl -H "Content-Type: application/json" -X POST -d '{"client_name":"Big Boy Cope", "birth_day":"03/20/2016"}' https://better-together-f87fbab820d6.herokuapp.com/clients

$ curl -H "Content-Type: application/json" -X POST -d '{"client_name":"Lizzy", "birth_day":"01/17/1990"}' localhost:3000/clients

$ curl -H "Content-Type: application/json" -X POST -d '{"weight":10}' localhost:3000/clients_weights/318

$ curl -H "Content-Type: application/json" -X POST -d '{"weight":100}' localhost:3000/clients_weights/318

$ curl -X "DELETE" localhost:3000/clients/'id'

$ curl -X "DELETE" localhost:3000/clients_weights/14
```

## Recommended IDE Setup

We recommend using [VSCode](https://code.visualstudio.com/) with the following extensions for the best development experience:

- [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar) (Remember to disable Vetur)
- [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin)

## Deployments

Frontend: After running `npm run build`, push to your `main` branch to deploy the app. Heroku uses the contents of the `dist` folder for deployment.
Backend: Pushing to the `main` branch will automatically trigger a new Heroku build.

### View Heroku logs

```
$ heroku logs --tail
```

### Automated Tests

Testing is crucial for ensuring the reliability and stability of the application. In this project, automated tests have been set up to make the validation process more efficient. Make sure all dependencies are installed and the application's environment is set up correctly for the tests to run without issues.

```
##TOOLS USED##

Jest: A delightful JavaScript Testing Framework with a focus on simplicity.
Supertest: Provides a high-level abstraction for testing HTTP, while still allowing you to drop down to the lower-level API provided by superagent

```

##HOW TESTS WORK##

Jest acts as the test runner, providing an environment to execute our tests.
With Supertest, we can easily make HTTP requests to our API and assert the responses, making it suitable for testing RESTful services.

```
##RUNNING THE TESTS##

$ npm run test
```
