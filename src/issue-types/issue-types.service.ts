import { Injectable } from '@nestjs/common';
import { CreateIssueTypeDto } from './dto/create-issue-type.dto';
import { UpdateIssueTypeDto } from './dto/update-issue-type.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { IssueType } from './entities/issue-type.entity';
import { MongoRepository } from 'typeorm';
import { ObjectId } from 'mongodb';

@Injectable()
export class IssueTypesService {
  constructor(
    @InjectRepository(IssueType)
    private issueTypeRepository: MongoRepository<IssueType>,
  ) {}
  async create(createIssueTypeDto: CreateIssueTypeDto) {
    return await this.issueTypeRepository.save(createIssueTypeDto);
  }

  async findAll() {
    return await this.issueTypeRepository.find();
  }

  async findOne(id: ObjectId | string) {
    return await this.issueTypeRepository.findOne({
      where: { _id: new ObjectId(id) },
    });
  }

  update(id: string, updateIssueTypeDto: UpdateIssueTypeDto) {
    return `This action updates a #${id} issueType`;
  }

  remove(id: number) {
    return `This action removes a #${id} issueType`;
  }
}
