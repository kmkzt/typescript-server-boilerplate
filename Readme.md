## Express api boilerplate

express, postgresSQL, websocket

## get started

## start development

```shell
docker-compose up -d

yarn dev
```

# [wip] need to create table

connect docker psqlDB

```shell
sqlbash container=CONTAINER_NAME

or

docker exec -it CONTAINER_NAME bash
```

## build production

wip

```
yarn build
```

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

- [ ] database migration
- [x] restfull api
- [ ] Unit Test
- [ ] graphql
- [x] jwt
- [x] WebSocket
