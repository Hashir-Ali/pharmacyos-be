import { Injectable } from '@nestjs/common';
import { CreateIssueDto } from './dto/create-issue.dto';
import { UpdateIssueDto } from './dto/update-issue.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Issue } from './entities/issue.entity';
import { MongoRepository } from 'typeorm';
import { ObjectId } from 'mongodb';

@Injectable()
export class IssuesService {
  constructor(
    @InjectRepository(Issue)
    private issuesRepository: MongoRepository<Issue>,
  ) {}

  async create(createIssueDto: CreateIssueDto) {
    return await this.issuesRepository.save(createIssueDto);
  }

  async findAll() {
    return await this.issuesRepository.find();
  }

  findOne(id: string) {
    return this.issuesRepository.findOne({ where: { _id: new ObjectId(id) } });
  }

  async findDrugIssues(drugId: string) {
    return await this.issuesRepository.find({
      where: { drugId: new ObjectId(drugId) },
    });
  }

  async update(id: string, updateIssueDto: UpdateIssueDto) {
    return await this.issuesRepository.update(new ObjectId(id), updateIssueDto);
  }
}
