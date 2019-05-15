# Typescript server boilerplate

Typescript server application boilerplate.
Express, PostgresSQL, Websocket

# get started

## start development

```shell
docker-compose up -d # DB contaner start
yarn typeorm:dev:sync # DB init
yarn && yarn dev # Start Express Server
```

## graphQL

change [schema](./src/graphql/schema.graphql) and [codegen.yml](./codegen.yml)

then, generate ts inteface.

```
yarn graphql:codegen
```

development stated and open http://localhost:5000/graphql

## deploy heroku

```
heroku create
// **** is heroku of git repository
git add remote heroku ****
git push heroku master
```

heroku docs
https://devcenter.heroku.com/articles/git

**heroku command**

```shell
heroku log -t # logs
heroku logs -p postgres -t # postgres logs
heroku addons # addons info
heroku pg:info # pgql info
```

connect database

```shell
heroku pg:psql # connect pgql

# then
DATABASE-> CREATE TABLE IF NOT EXISTS ...
```

## feature

- [x] database migration
- [x] restfull api
- [ ] Unit Test
- [x] graphql
- [ ] File Upload (AWS S3)
- [x] jwt
- [x] WebSocket

## Reffernce

graphql-codegen
https://graphql-code-generator.com/docs/getting-started/
