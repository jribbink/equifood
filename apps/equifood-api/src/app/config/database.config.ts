import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  // Typeorm Config
  url: process.env.DATABASE_URL,
  type: process.env.DATABASE_TYPE ?? 'mariadb',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT, 10) || 3306,
  password: process.env.DATABASE_PASSWORD,
  name: process.env.DATABASE_NAME,
  username: process.env.DATABASE_USERNAME,
  synchronize: (process.env.DATABASE_SYNCHRONIZE ?? 'true') === 'true',
  maxConnections: parseInt(process.env.DATABASE_MAX_CONNECTIONS, 10) || 100,
  sslEnabled: process.env.DATABASE_SSL_ENABLED === 'true',
  rejectUnauthorized: process.env.DATABASE_REJECT_UNAUTHORIZED === 'true',
  ca: process.env.DATABASE_CA,
  key: process.env.DATABASE_KEY,
  cert: process.env.DATABASE_CERT,

  // Backup Config
  backupSchedule: process.env.DATABASE_BACKUP_SCHEDULE,
  backupDir: process.env.DATABASE_GCP_BACKUP_DIR,
}));
