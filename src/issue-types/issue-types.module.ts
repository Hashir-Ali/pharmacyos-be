import { Module } from '@nestjs/common';
import { IssueTypesService } from './issue-types.service';
import { IssueTypesController } from './issue-types.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IssueType } from './entities/issue-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([IssueType])],
  controllers: [IssueTypesController],
  providers: [IssueTypesService],
  exports: [IssueTypesService],
})
export class IssueTypesModule {}
