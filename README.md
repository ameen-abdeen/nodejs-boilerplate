# Used Technologies

1. Node JS
2. Express framework
3. Postgres for db access.
4. Jest for tests and SuperTest for request mocking
5. SonarQube for code analysis
6. dotenv for manage environment variables
7. Docker & Docker Compose for production build and deployment

# Getting Started (for development)

## Linux / Mac OS / Windows

1. Checkout the code
2. Go to project root directory in terminal or CMD
3. npm install
4. npm run dev

# Development (Linux / Mac OS / Windows)

## Run

npm run dev

## Build

npm run build

## Clean (remove previous build)

npm run clean

## Lint

npm run lint

## Test

npm run test

## Collect Test Coverage

npm run test-coverage

## Create Migration (Have to write sql queries for changes manually)

npm run typeorm:cli -- migration:create -n <migration_name>

## Generate Migration

npm run typeorm:cli -- migration:generate -n <migration_name>

## Revert Migration (Reverts only the last migration. If you need to revert more than one migration, developer need to call revert multiple times)

npm run typeorm:cli -- migration:revert

## Run Migration (Migrations will be executed at the time of starting the service. If the developer wants to run it prior use the following command)

npm run typeorm:cli -- migration:run

# Production

## Build

docker-compose build

## Run

docker-compose up

## Release

docker push <image_name>

# Database

PostgreSQL DB is used for database.
