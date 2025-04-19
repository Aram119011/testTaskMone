import { Injectable } from '@nestjs/common';
import { Client } from 'pg';
import { readFileSync } from 'fs';
import * as dotenv from 'dotenv';
dotenv.config();



@Injectable()
export class MigrationService {
  private client: Client;


  constructor() {
    this.client = new Client({
      host: process.env.DB_HOST || 'localhost',
      database: process.env.DB_NAME || 'm1db',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || 'admin',
      port: process.env.DB_PORT || 5432
    });
  }

  async runMigration() {
    await this.client.connect();

    try {
      const migrationHistoryQuery = `
        CREATE TABLE IF NOT EXISTS migrations (
          id SERIAL PRIMARY KEY,
          name VARCHAR(255) UNIQUE,
          applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `;
      await this.client.query(migrationHistoryQuery);

      const migrationFilePath = 'src/migrations/2025_04_01_create_products_table.sql';
      const sql = readFileSync(migrationFilePath, 'utf8');
      await this.client.query(sql);


      const migrationRecordQuery = `
        INSERT INTO migrations (name) VALUES ('2025_04_01_create_products_table') ON CONFLICT DO NOTHING;
      `;
      await this.client.query(migrationRecordQuery);

      console.log('Migration applied successfully');
    } catch (error) {
      console.error('Error applying migration:', error);
    } finally {
      await this.client.end();
    }
  }
}

