import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Client } from '@notionhq/client';

@Injectable()
export class NotionService {
  constructor(private configService: ConfigService) {}
  databaseId = this.configService.get<string>('DB_ID');
  // Initializing a client
  notion = new Client({
    auth: this.configService.get<string>('NOTION_TOKEN'),
  });
  async getCourseDb() {
    const response = await this.notion.databases.query({
      database_id: this.databaseId,
    });
    return response;
  }

  async getCoursesByDept(deptId: string) {
    console.log(deptId);
    const response = await this.notion.databases.query({
      database_id: this.databaseId,
      filter: {
        property: 'dept_code',
        multi_select: {
          contains: deptId,
        },
      },
    });
    return response;
  }
}
