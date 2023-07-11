# Better Together backend

## Trainer App

## Project Setup

### Compile and Hot-Reload for Development on localhost:5173

```
$ npm run start:watch
```

### Compile and Minify for Production

```
$ npm run build:stage
```

### Example post request:

```
$ curl -H "Content-Type: application/json" -X POST -d '{"client_name":"Big Boy Cope", "birth_day":"03/20/2016"}' https://morning-eyrie-78322.herokuapp.com/clients
```

$ curl -H "Content-Type: application/json" -X POST -d '{"client_name":"Lizzy", "birth_day":"01/17/1990"}' localhost:3000/clients

$ curl -H "Content-Type: application/json" -X POST -d '{"weight":10}' localhost:3000/clients_weights/318

curl -H "Content-Type: application/json" -X POST -d '{"weight":100}' localhost:3000/clients_weights/318

$ curl -X "DELETE" localhost:3000/clients/'id'

$ curl -X "DELETE" localhost:3000/clients_weights/14

### view heroku logs

```
$ heroku logs --tail
```
