import { Injectable, OnModuleInit } from '@nestjs/common';
import { Pool } from 'pg';

@Injectable()
export class DatabaseService implements OnModuleInit {
  private pool: Pool;

  constructor() {
    this.pool = new Pool({
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT || 5432),
      user: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || 'admin',
      database: process.env.DB_NAME || 'm1db',
    });
  }

  async onModuleInit() {
    await this.pool.connect();
    console.log('Connected to PostgreSQL from NestJS');
  }


  async query(sql: string, params: any[] = []) {
    const result = await this.pool.query(sql, params);
    return result.rows;
  }

  async close() {
    await this.pool.end();
  }
}
