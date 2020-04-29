import { str, cleanEnv, port } from 'envalid';

function validateEnv(): void {
  cleanEnv(process.env, {
    POSTGRES_HOST: str(),
    POSTGRES_PORT: port(),
    POSTGRES_DB: str(),
    SERVER_PORT: port(),
    VERSION: str(),
    LOG_LEVEL: str(),
    KEYCLOAK_API_URL: str(),
    KEYCLOAK_REALM: str(),
  });
}

export default validateEnv;
