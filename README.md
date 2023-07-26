# Better Together - Full Stack Application

This repository contains both the frontend UI and the backend server for the Better Together application.

## Overview local on my computer

--UI is VUE and ran on locahhost:5173
--API is NODE.js and ran on localhost:3000
--DB is POSTGRESQL and ran on localhost:5431

## Overview prod on heroku

--UI is VUE and ran on bettertogether.day
--API is hosted by heroku and ran on https://better-together-f87fbab820d6.herokuapp.com/
--DB is hosted by heroku on 5432

## Frontend - Better Together UI (Vue.js)

The frontend is built with Vue.js and uses Vite for build process.

### Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

### Project Setup

\```
npm install
\```

### Compile and Hot-Reload for Development

\```
npm run dev
\```

### Compile and Minify for Production

\```
npm run build
\```

> Note: After running `npm run build`, push to your main branch. Heroku uses the contents of the `dist` folder for deployment.

For additional customization, see the [Vite Configuration Reference](https://vitejs.dev/config/).

## Backend - Better Together Server (Node.js)

The backend server for Better Together.

### Project Setup

### Compile and Hot-Reload for Development on localhost:5173

\```
$ npm run start:watch
\```

### Compile and Minify for Production

\```
$ npm run build:stage
\```

### Example post request:

\```
$ curl -H "Content-Type: application/json" -X POST -d '{"client_name":"Big Boy Cope", "birth_day":"03/20/2016"}' https://better-together-f87fbab820d6.herokuapp.com/clients

$ curl -H "Content-Type: application/json" -X POST -d '{"client_name":"Lizzy", "birth_day":"01/17/1990"}' localhost:3000/clients

$ curl -H "Content-Type: application/json" -X POST -d '{"weight":10}' localhost:3000/clients_weights/318

$ curl -H "Content-Type: application/json" -X POST -d '{"weight":100}' localhost:3000/clients_weights/318

$ curl -X "DELETE" localhost:3000/clients/'id'

$ curl -X "DELETE" localhost:3000/clients_weights/14
\```

### View Heroku logs

\```
$ heroku logs --tail
\```
