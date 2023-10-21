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
import { Role } from 'src/common/role.enum';
import { Drug } from 'src/drug/entities/drug.entity';
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
      note: null,
      created_by: new ObjectId(createIssueDto.created_by),
    });

    return { issue, notes };
  }

  async findAll(
    user: { userId: string; username: string; roles: string[] },
    page: string,
    limit: string,
    query: string,
    filters: string[] = [],
  ) {
    let issues: [Issue[], number];
    let today: boolean = false;
    let drugs: [Drug[], number];
    let drugIds: string[] = [];
    const skip = Math.abs((parseInt(page) - 1) * parseInt(limit));

    if (query.length > 0) {
      drugs = await this.drugService.findFilter({ filters: query });
      drugIds = drugs[0].map((drug) => {
        return drug._id.toString();
      });
    }

    if (filters.includes('today')) {
      filters = filters.filter((item) => item != 'today');
      today = true;
    }

    if (
      user.roles.includes(Role.Admin) ||
      user.roles.includes(Role.SuperAdmin)
    ) {
      issues = await this.issuesRepository.findAndCount({
        where:
          filters.length > 0
            ? drugIds.length > 0
              ? today
                ? {
                    progress: { $ne: IssueProgress.Completed },
                    issue_type: {
                      $in: filters,
                    },
                    drugId: { $in: drugIds },
                    created_at: new Date().toISOString(),
                  }
                : {
                    progress: { $ne: IssueProgress.Completed },
                    issue_type: {
                      $in: filters,
                    },
                    drugId: { $in: drugIds },
                  }
              : today
              ? {
                  progress: { $ne: IssueProgress.Completed },
                  issue_type: {
                    $in: filters,
                  },
                  created_at: new Date().toISOString(),
                }
              : {
                  progress: { $ne: IssueProgress.Completed },
                  issue_type: {
                    $in: filters,
                  },
                }
            : drugIds.length > 0
            ? today
              ? {
                  progress: { $ne: IssueProgress.Completed },
                  drugId: { $in: drugIds },
                  created_at: new Date().toISOString(),
                }
              : {
                  progress: { $ne: IssueProgress.Completed },
                  drugId: { $in: drugIds },
                }
            : today
            ? {
                progress: { $ne: IssueProgress.Completed },
                created_at: new Date().toISOString(),
              }
            : {
                progress: { $ne: IssueProgress.Completed },
              },
        skip: skip,
        take: parseInt(limit),
      });
    } else {
      issues = await this.issuesRepository.findAndCount({
        where:
          filters.length > 0
            ? drugIds.length > 0
              ? today
                ? {
                    assigned_to: user.userId,
                    progress: { $ne: IssueProgress.Completed },
                    issue_type: {
                      $in: filters,
                    },
                    drugId: { $in: drugIds },
                    created_at: new Date().toISOString(),
                  }
                : {
                    assigned_to: user.userId,
                    progress: { $ne: IssueProgress.Completed },
                    issue_type: {
                      $in: filters,
                    },
                    drugId: { $in: drugIds },
                  }
              : today
              ? {
                  assigned_to: user.userId,
                  progress: { $ne: IssueProgress.Completed },
                  issue_type: {
                    $in: filters,
                  },
                  created_at: new Date().toISOString(),
                }
              : {
                  assigned_to: user.userId,
                  progress: { $ne: IssueProgress.Completed },
                  issue_type: {
                    $in: filters,
                  },
                }
            : drugIds.length > 0
            ? today
              ? {
                  assigned_to: user.userId,
                  progress: { $ne: IssueProgress.Completed },
                  drugId: { $in: drugIds },
                  created_at: new Date().toISOString(),
                }
              : {
                  assigned_to: user.userId,
                  progress: { $ne: IssueProgress.Completed },
                  drugId: { $in: drugIds },
                }
            : today
            ? {
                assigned_to: user.userId,
                progress: { $ne: IssueProgress.Completed },
                created_at: new Date().toISOString(),
              }
            : {
                assigned_to: user.userId,
                progress: { $ne: IssueProgress.Completed },
              },
        skip: skip,
        take: parseInt(limit),
      });
    }
    const issueNotes = issues[0].map(async (issue) => {
      const issueType = await this.issueTypeService.findOne(issue.issue_type);
      const notes = await this.notesService.findByIssue(issue._id);
      const created_by = await this.userService.findOne(issue.created_by);
      const assigned_to = await this.userService.findOne(issue.assigned_to);
      const drug = await this.drugService.findOne(issue.drugId.toString());
      return {
        ...issue,
        drugId: drug,
        created_by: created_by,
        // added below fields for client side sorting...!
        created_by_name: created_by.first_name + ' ' + created_by.last_name,
        assigned_to_name: assigned_to.first_name + ' ' + created_by.last_name,
        drug:
          drug.name +
          ' ' +
          drug.dosage +
          ' ' +
          drug.dosageUnit +
          ' ' +
          drug.dosageForm,
        // added above fields for client side sorting...!
        assigned_to: assigned_to,
        issue_type: issueType.issue_type,
        notes: notes[notes.length - 1],
      };
    });
    return [await Promise.all(issueNotes), issues[1]];
  }

  async findCompleted(
    user: {
      userId: string;
      username: string;
      roles: string[];
    },
    page: string,
    limit: string,
    query: string,
    filters: string[] = [],
  ) {
    let issues: [Issue[], number];
    let today: boolean = false;
    let drugs: [Drug[], number];
    let drugIds: string[] = [];

    const skip = Math.abs((parseInt(page) - 1) * parseInt(limit));

    if (query.length > 0) {
      drugs = await this.drugService.findFilter({ filters: query });
      drugIds = drugs[0].map((drug) => {
        return drug._id.toString();
      });
    }

    if (filters.includes('today')) {
      filters = filters.filter((item) => item != 'today');
      today = true;
    }

    if (
      user.roles.includes(Role.Admin) ||
      user.roles.includes(Role.SuperAdmin)
    ) {
      issues = await this.issuesRepository.findAndCount({
        where:
          filters.length > 0
            ? drugIds.length > 0
              ? today
                ? {
                    progress: IssueProgress.Completed,
                    issue_type: {
                      $in: filters,
                    },
                    drugId: { $in: drugIds },
                    created_at: { $gte: new Date().toISOString() },
                  }
                : {
                    progress: IssueProgress.Completed,
                    issue_type: {
                      $in: filters,
                    },
                    drugId: { $in: drugIds },
                  }
              : today
              ? {
                  progress: IssueProgress.Completed,
                  issue_type: {
                    $in: filters,
                  },
                  created_at: { $gte: new Date().toISOString() },
                }
              : {
                  progress: IssueProgress.Completed,
                  issue_type: {
                    $in: filters,
                  },
                }
            : drugIds.length > 0
            ? today
              ? {
                  progress: IssueProgress.Completed,
                  drugId: { $in: drugIds },
                  created_at: { $gte: new Date().toISOString() },
                }
              : {
                  progress: IssueProgress.Completed,
                  drugId: { $in: drugIds },
                }
            : {
                progress: IssueProgress.Completed,
              },

        skip: skip,
        take: parseInt(limit),
      });
    } else {
      issues = await this.issuesRepository.findAndCount({
        where:
          filters.length > 0
            ? drugIds.length > 0
              ? today
                ? {
                    assigned_to: user.userId,
                    progress: IssueProgress.Completed,
                    issue_type: {
                      $in: filters,
                    },
                    drugId: { $in: drugIds },
                    created_at: { $gte: new Date().toISOString() },
                  }
                : {
                    assigned_to: user.userId,
                    progress: IssueProgress.Completed,
                    issue_type: {
                      $in: filters,
                    },
                    drugId: { $in: drugIds },
                  }
              : today
              ? {
                  assigned_to: user.userId,
                  progress: IssueProgress.Completed,
                  issue_type: {
                    $in: filters,
                  },
                  created_at: new Date().toISOString(),
                }
              : {
                  assigned_to: user.userId,
                  progress: IssueProgress.Completed,
                  issue_type: {
                    $in: filters,
                  },
                }
            : drugIds.length > 0
            ? today
              ? {
                  assigned_to: user.userId,
                  progress: IssueProgress.Completed,
                  drugId: { $in: drugIds },
                  created_at: new Date().toISOString(),
                }
              : {
                  assigned_to: user.userId,
                  progress: IssueProgress.Completed,
                  drugId: { $in: drugIds },
                }
            : today
            ? {
                assigned_to: user.userId,
                progress: IssueProgress.Completed,
                created_at: new Date().toISOString(),
              }
            : {
                assigned_to: user.userId,
                progress: IssueProgress.Completed,
              },
      });
    }
    const issueNotes = issues[0].map(async (issue) => {
      const issueType = await this.issueTypeService.findOne(issue.issue_type);
      const notes = await this.notesService.findByIssue(issue._id);
      const created_by = await this.userService.findOne(issue.created_by);
      const assigned_to = await this.userService.findOne(issue.assigned_to);
      const drug = await this.drugService.findOne(issue.drugId.toString());
      return {
        ...issue,
        drugId: drug,
        // added below fields for client side sorting...!
        created_by_name: created_by.first_name + ' ' + created_by.last_name,
        assigned_to_name: assigned_to.first_name + ' ' + created_by.last_name,
        drug:
          drug.name +
          ' ' +
          drug.dosage +
          ' ' +
          drug.dosageUnit +
          ' ' +
          drug.dosageForm,
        // added above fields for client side sorting...!
        created_by: created_by,
        assigned_to: assigned_to,
        issue_type: issueType.issue_type,
        notes: notes[notes.length - 1],
      };
    });
    return [await Promise.all(issueNotes), issues[1]];
  }

  async findOne(id: string) {
    const issue = await this.issuesRepository.findOne({
      where: { _id: new ObjectId(id) },
    });

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
      notes: notes,
    };
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
      const issue = await this.issuesRepository.findOne({
        where: { _id: new ObjectId(id) },
      });

      const notes = await this.notesService.create({
        issue: new ObjectId(id),
        note: updateIssueDto.notes,
        created_by: new ObjectId(issue.created_by),
      });
      return await this.issuesRepository.update(
        new ObjectId(id),
        updateIssueDto,
      );
    } else {
      const issue = await this.issuesRepository.findOne({
        where: { _id: new ObjectId(id) },
      });

      if (user.userId === issue.assigned_to) {
        const issue = await this.issuesRepository.findOne({
          where: { _id: new ObjectId(id) },
        });

        const notes = await this.notesService.create({
          issue: new ObjectId(id),
          note: updateIssueDto.notes,
          created_by: new ObjectId(issue.created_by),
        });

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
