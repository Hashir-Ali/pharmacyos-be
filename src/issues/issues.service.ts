import { NotesService } from './../notes/notes.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateIssueDto } from './dto/create-issue.dto';
import { UpdateIssueDto } from './dto/update-issue.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Issue, IssueProgress } from './entities/issue.entity';
import { MongoRepository } from 'typeorm';
import { ObjectId } from 'mongodb';
import { IssueTypesService } from 'src/issue-types/issue-types.service';
import { UsersService } from 'src/users/users.service';
import { DrugService } from 'src/drug/drug.service';
import { User } from 'src/users/user.entity';
import { Role } from 'src/common/role.enum';
@Injectable()
export class IssuesService {
  constructor(
    @InjectRepository(Issue)
    private issuesRepository: MongoRepository<Issue>,
    private notesService: NotesService,
    private issueTypeService: IssueTypesService,
    private userService: UsersService,
    private drugService: DrugService,
  ) {}

  async create(createIssueDto: CreateIssueDto) {
    const issue = await this.issuesRepository.save({
      ...createIssueDto,
      closing_date: '',
    });
    const notes = await this.notesService.create({
      issue: new ObjectId(issue._id),
      note: createIssueDto.note,
      created_by: new ObjectId(createIssueDto.created_by),
    });

    return { issue, notes };
  }

  async findAll(user: { userId: string; username: string; roles: string[] }) {
    let issues: Issue[];
    if (
      user.roles.includes(Role.Admin) ||
      user.roles.includes(Role.SuperAdmin)
    ) {
      issues = await this.issuesRepository.find({
        where: { progress: IssueProgress.InProgress },
      });
    } else {
      issues = await this.issuesRepository.find({
        where: {
          assigned_to: user.userId,
          progress: IssueProgress.InProgress,
        },
      });
    }
    const issueNotes = issues.map(async (issue) => {
      const issueType = await this.issueTypeService.findOne(issue.issue_type);
      const notes = await this.notesService.findByIssue(issue._id);
      const created_by = await this.userService.findOne(issue.created_by);
      const assigned_to = await this.userService.findOne(issue.assigned_to);
      const drug = await this.drugService.findOne(issue.drugId.toString());
      return {
        ...issue,
        drugId: drug,
        created_by: created_by,
        assigned_to: assigned_to,
        issue_type: issueType.issue_type,
        notes: notes[notes.length - 1],
      };
    });
    return await Promise.all(issueNotes);
  }

  async findCompleted(user: {
    userId: string;
    username: string;
    roles: string[];
  }) {
    let issues: Issue[];
    if (
      user.roles.includes(Role.Admin) ||
      user.roles.includes(Role.SuperAdmin)
    ) {
      issues = await this.issuesRepository.find({
        where: { progress: IssueProgress.Completed },
      });
    } else {
      issues = await this.issuesRepository.find({
        where: {
          assigned_to: user.userId,
          progress: IssueProgress.Completed,
        },
      });
    }
    const issueNotes = issues.map(async (issue) => {
      const issueType = await this.issueTypeService.findOne(issue.issue_type);
      const notes = await this.notesService.findByIssue(issue._id);
      const created_by = await this.userService.findOne(issue.created_by);
      const assigned_to = await this.userService.findOne(issue.assigned_to);
      const drug = await this.drugService.findOne(issue.drugId.toString());
      return {
        ...issue,
        drugId: drug,
        created_by: created_by,
        assigned_to: assigned_to,
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

  async update(id: string, updateIssueDto: UpdateIssueDto, user) {
    if (
      updateIssueDto.progress === IssueProgress.Completed &&
      !updateIssueDto.closing_date
    ) {
      throw new BadRequestException(
        'No closing date specified with completed status...',
      );
    }
    // or if role is of an admin or superAdmin then allow to update...
    // if only user role type then check if requesting user ID and assignedto userId are matching.
    if (
      user.roles.includes(Role.Admin) ||
      user.roles.includes(Role.SuperAdmin)
    ) {
      return await this.issuesRepository.update(
        new ObjectId(id),
        updateIssueDto,
      );
    } else {
      const issue = await this.issuesRepository.findOne({
        where: { _id: new ObjectId(id) },
      });

      if (user.userId === issue.assigned_to) {
        return await this.issuesRepository.update(
          new ObjectId(id),
          updateIssueDto,
        );
      } else {
        throw new BadRequestException('User not allowed to update this record');
      }
    }
  }
}
