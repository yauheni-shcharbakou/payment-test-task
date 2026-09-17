import { ReflectMetadataProvider } from '@mikro-orm/decorators/legacy';
import { Migrator } from '@mikro-orm/migrations';
import { defineConfig } from '@mikro-orm/postgresql';
import { Logger } from '@nestjs/common';
import { config } from 'dotenv';
import { cwd } from 'process';

config();

const repositoryRoot = cwd();
const logger = new Logger('MikroORM');

export default defineConfig({
  entities: [`${repositoryRoot}/dist/**/*.entity.js`],
  entitiesTs: [`${repositoryRoot}/src/**/*.entity.ts`],
  dbName: process.env.DATABASE_NAME || 'payments',
  clientUrl:
    process.env.DATABASE_URL ||
    `postgresql://${process.env.DATABASE_USER || 'admin'}:${process.env.DATABASE_PASSWORD || 'string123'}@localhost:5432`,
  metadataProvider: ReflectMetadataProvider,
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  logger: logger.log.bind(logger),
  extensions: [Migrator],
  migrations: {
    path: `${repositoryRoot}/dist/migrations`,
    pathTs: `${repositoryRoot}/src/migrations`,
    transactional: true,
    allOrNothing: true,
  },
});
