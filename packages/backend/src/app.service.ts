import { Injectable } from '@nestjs/common';
import { connectToDatabase } from '@@saloodo/saloodo-database';
@Injectable()
export class AppService {
  constructor() {
    this.DBConnect();
  }

  async DBConnect(): Promise<void> {
    await connectToDatabase(process.env.DATABASE_URL);
  }
}
