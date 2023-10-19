import { NotesService } from './../notes/notes.service';
import { Injectable } from '@nestjs/common';
import { CreateIssueDto } from './dto/create-issue.dto';
import { UpdateIssueDto } from './dto/update-issue.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Issue } from './entities/issue.entity';
import { MongoRepository } from 'typeorm';
import { ObjectId } from 'mongodb';
import { IssueTypesService } from 'src/issue-types/issue-types.service';
@Injectable()
export class IssuesService {
  constructor(
    @InjectRepository(Issue)
    private issuesRepository: MongoRepository<Issue>,
    private notesService: NotesService,
    private issueTypeService: IssueTypesService,
  ) {}

  async create(createIssueDto: CreateIssueDto) {
    const issue = await this.issuesRepository.save(createIssueDto);
    const notes = await this.notesService.create({
      issue: new ObjectId(issue._id),
      note: createIssueDto.note,
      created_by: new ObjectId(createIssueDto.created_by),
    });

    return { issue, notes };
  }

  async findAll() {
    const issues = await this.issuesRepository.find();
    const issueNotes = issues.map(async (issue) => {
      const issueType = await this.issueTypeService.findOne(issue.issue_type);
      const notes = await this.notesService.findByIssue(issue._id);
      return {
        ...issue,
        issue_type: issueType.issue_type,
        notes: notes[notes.length - 1],
      };
    });
    return await Promise.all(issueNotes);
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

  async delete(id: ObjectId | string) {
    return await this.issuesRepository.delete(new ObjectId(id));
  }
}
