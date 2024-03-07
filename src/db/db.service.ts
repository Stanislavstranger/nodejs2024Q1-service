import { Injectable } from '@nestjs/common';
import { DB } from './db';

@Injectable()
export class DbService {
  private db: Promise<DB>;

  constructor() {
    this.db = import('./db').then((module) => module.default);
  }

  async getDb(): Promise<DB> {
    return this.db;
  }
}
