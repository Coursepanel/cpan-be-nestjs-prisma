import { NotionController } from './notion.controller';
import { Module } from '@nestjs/common';
import { NotionService } from './notion.service';

@Module({
  controllers: [NotionController],
  providers: [NotionService],
  exports: [NotionService],
})
export class NotionModule {}
