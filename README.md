# Better Together

## Trainer App with PAWS

### Example post request:

```
$ curl -H "Content-Type: application/json" -X POST -d '{"client_name":"Big Boy Cope", "birth_day":"03/20/2016"}' https://morning-eyrie-78322.herokuapp.com/clients
```

$ curl -H "Content-Type: application/json" -X POST -d '{"client_name":"Lizzy", "birth_day":"01/17/1990"}' localhost:3000/clients

$ curl -X "DELETE" localhost:3000/clients/'id'

view heroku logs

```
$ heroku logs --tail
```

```
run app
$ npm start:watch
```
