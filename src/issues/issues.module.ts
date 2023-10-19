import { Module } from '@nestjs/common';
import { IssuesService } from './issues.service';
import { IssuesController } from './issues.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Issue } from './entities/issue.entity';
import { NotesModule } from 'src/notes/notes.module';
import { IssueTypesModule } from 'src/issue-types/issue-types.module';
@Module({
  imports: [TypeOrmModule.forFeature([Issue]), NotesModule, IssueTypesModule],
  controllers: [IssuesController],
  providers: [IssuesService],
  exports: [IssuesService],
})
export class IssuesModule {}
