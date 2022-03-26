import { Injectable } from '@nestjs/common';
import { Client } from '@notionhq/client';

@Injectable()
export class NotionService {
  databaseId = process.env.DB_ID;
  // Initializing a client
  notion = new Client({
    auth: process.env.NOTION_TOKEN,
  });
  async getCourseDb() {
    const response = await this.notion.databases.query({
      database_id: this.databaseId,
    });
    return response;
  }
}
