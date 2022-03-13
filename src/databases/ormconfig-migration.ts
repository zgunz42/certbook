import databaseConfig from 'src/common/config/database.config';

const dbConfig = databaseConfig();
const root_dir = process.env.PROJECT_DIR;

export default {
  type: dbConfig.type,
  host: dbConfig.host,
  port: dbConfig.port,
  username: dbConfig.username,
  password: dbConfig.password,
  database: dbConfig.database,
  synchronize: dbConfig.syncronize,
  entities: dbConfig.entities,
  migrations: [`src/databases/migrations/*.ts`],
  cli: {
    migrationsDir: `src/databases/migrations`,
  },
};
