# rightpaw

## Development guide

### Directory structure
- `docker`: contains docker related files
- `app`: backend source code
- `web`: frontend source code

### Run app
```bash
cp docker/.env.example docker.env
cp app/.env.example app/.env
cp web/.env.example web/.env

cd docker
docker-compose -f docker-compose.local.yml up -d
docker-compose -f docker-compose.local.yml exec rightpaw-app sh -c "npx prisma generate"
docker-compose -f docker-compose.local.yml exec rightpaw-app sh -c "npx prisma db push"
docker-compose -f docker-compose.local.yml exec rightpaw-app sh -c "npx prisma db seed"
```

### Web
http://localhost:3001

### GraphQL playground
http://localhost:3000/graphql

### Unit test
```bash
cd docker
docker-compose -f docker-compose.local.yml exec rightpaw-app sh -c "yarn test"
```
