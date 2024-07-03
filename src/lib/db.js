import { Pool } from 'pg';

const pool = new Pool({
  connectionString: 'postgresql://nm-demo_owner:9TbSx7lWaUCv@ep-silent-fire-a5bxsg56-pooler.us-east-2.aws.neon.tech/nm-demo?sslmode=require',
});

pool.on('connect', () => {
  console.log('Connected to the database');
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

const db = {
  query: (text, params) => pool.query(text, params),
};

export default db;