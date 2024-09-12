## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ npx prisma migrate deploy
$ npx prisma generate
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Prisma

```bash
$ npx prisma migrate dev --name init
$ npx prisma studio (to show tables in database)
```

## Add data to test

```bash
$ npx ts-node prisma/seed.ts
```
