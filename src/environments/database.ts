// import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
const root_dir = process.env.PROJECT_DIR;

export default {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  entities: [`${root_dir}/src/**/*.entity{.ts,.js}`],
  migrations: [`${root_dir}/migrations/*.ts`],
  subscribers: [`${root_dir}/src/**/*.subscriber{.ts,.js}`],
  // namingStrategy: new SnakeNamingStrategy(),
  cli: {
    entitiesDir: `${root_dir}/src`,
    migrationsDir: `${root_dir}/migrations`,
    subscribersDir: `${root_dir}/src`,
  },
};
