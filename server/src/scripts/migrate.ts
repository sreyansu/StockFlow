import fs from 'fs';
import path from 'path';
import pool from '../db';

const migrate = async () => {
  try {
    const sql = fs.readFileSync(path.join(__dirname, '../../database.sql'), 'utf8');
    const client = await pool.connect();
    try {
      await client.query(sql);
      console.log('Database migration successful!');
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Database migration failed:', error);
  } finally {
    pool.end();
  }
};

migrate();
