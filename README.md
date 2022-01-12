# rightpaw-backend

## Development guide

### Directory structure
- `docker`: contains docker related files
- `app`: nestjs source code

### Run app
```bash
cp docker/.env.example docker.env
cp app/.env.example app/.env

cd docker
docker-compose -f docker-compose.local.yml up rightpaw-app
docker-compose -f docker-compose.local.yml exec rightpaw-app sh -c "npx prisma generate"
docker-compose -f docker-compose.local.yml exec rightpaw-app sh -c "npx prisma db push"
docker-compose -f docker-compose.local.yml exec rightpaw-app sh -c "npx prisma db seed"
```

### GraphQL playground
http://localhost:3000/graphql

### Unit test
```bash
cd docker
docker-compose -f docker-compose.local.yml exec rightpaw-app sh -c "yarn test"
```
