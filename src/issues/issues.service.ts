import { NotesService } from './../notes/notes.service';
import {
  BadRequestException,
  Injectable,
  forwardRef,
  Inject,
} from '@nestjs/common';
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

function resolveSortFields(sortField: string) {
  switch (sortField) {
    case 'notes':
      return 'last_note.note';
    case 'created_by_name':
      return 'created_by.firstName';
    case 'assigned_to_name':
      return 'assigned_to.firstName';
    case 'Updated_at':
    case 'description':
    case 'progress':
    case 'due_date':
      return sortField;
    case 'drug':
    default:
      return 'drugId.name';
  }
}

@Injectable()
export class IssuesService {
  constructor(
    @InjectRepository(Issue)
    private issuesRepository: MongoRepository<Issue>,
    private notesService: NotesService,
    private issueTypeService: IssueTypesService,
    private userService: UsersService,
    @Inject(forwardRef(() => DrugService))
    private drugService: DrugService,
  ) {}

  async create(createIssueDto: CreateIssueDto) {
    const drug = await this.drugService.findOne(
      createIssueDto.drugId.toString(),
    );
    const issueType = await this.issueTypeService.findOne(
      createIssueDto.issue_type,
    );
    const created_by = await this.userService.findOne(
      createIssueDto.created_by,
    );
    const assigned_to = await this.userService.findOne(
      createIssueDto.assigned_to,
    );

    const note = await this.notesService.create({
      note: null,
      created_by: new ObjectId(createIssueDto.created_by),
    });

    await this.drugService.updateDrug(drug._id, {
      status: false,
      name: drug.name,
      dosage: drug.dosage,
      dosageUnit: drug.dosageUnit,
      dosageForm: drug.dosageForm,
      BNFCode: drug.BNFCode,
      fullDescription: drug.fullDescription,
      containerSize: drug.containerSize,
      location: drug.location,
      drugEAN: drug.drugEAN,
      last_order: drug.last_order,
      rule_type: drug.rule_type,
    });

    // update drug status here....!
    const issue = await this.issuesRepository.save({
      drugId: {
        _id: drug._id,
        name: drug.name,
        dosage: drug.dosage,
        unit: drug.dosageUnit,
        type: drug.dosageForm,
      },
      issue_type: issueType.issue_type,
      description: createIssueDto.description,
      due_date: createIssueDto.due_date,
      created_by: {
        _id: created_by._id,
        firstName: created_by.first_name,
        lastName: created_by.last_name,
      },
      closing_date: null,
      assigned_to: {
        _id: assigned_to._id,
        firstName: assigned_to.first_name,
        lastName: assigned_to.last_name,
      },
      progress: createIssueDto.progress,
      last_note: { _id: note._id, note: note.note, created_by: created_by._id },
    });

    return { issue, note };
  }

  async findAll({
    user,
    page,
    limit,
    sortField,
    sortOrder,
    query,
    filters = [],
  }: {
    user: { userId: string; username: string; roles: string[] };
    page: string;
    limit: string;
    sortField: string;
    sortOrder: 'ASC' | 'DESC' | 'undefined';
    query: string;
    filters?: string[];
  }) {
    let issues: [Issue[], number];
    const skip = Math.abs((parseInt(page) - 1) * parseInt(limit));

    if (
      user.roles.includes(Role.Admin) ||
      user.roles.includes(Role.SuperAdmin)
    ) {
      issues = await this.issuesRepository.findAndCount({
        where: this.buildSearchQuery({
          user: user,
          progress: IssueProgress.InProgress,
          filterTags: filters,
          drugQuery: query,
        }),
        skip: skip,
        take: parseInt(limit),
        order: {
          [resolveSortFields(sortField)]:
            sortOrder && sortOrder.length > 0 && sortOrder != 'undefined'
              ? sortOrder
              : 'ASC',
        },
      });
    } else {
      issues = await this.issuesRepository.findAndCount({
        where: this.buildSearchQuery({
          user: user,
          progress: IssueProgress.InProgress,
          filterTags: filters,
          drugQuery: query,
        }),
        skip: skip,
        take: parseInt(limit),
        order: {
          [resolveSortFields(sortField)]:
            sortOrder && sortOrder.length > 0 && sortOrder !== 'undefined'
              ? sortOrder
              : 'ASC',
        },
      });
    }
    return issues;
  }

  async findCompleted(
    user: { userId: string; username: string; roles: string[] },
    page: string,
    limit: string,
    sortField: string,
    sortOrder: 'ASC' | 'DESC' | 'undefined',
    query: string,
    filters: string[] = [],
  ) {
    let issues: [Issue[], number];
    const skip = Math.abs((parseInt(page) - 1) * parseInt(limit));

    if (
      user.roles.includes(Role.Admin) ||
      user.roles.includes(Role.SuperAdmin)
    ) {
      issues = await this.issuesRepository.findAndCount({
        where: this.buildSearchQuery({
          user: user,
          progress: IssueProgress.Completed,
          filterTags: filters,
          drugQuery: query,
        }),

        skip: skip,
        take: parseInt(limit),
        order: {
          [resolveSortFields(sortField)]:
            sortOrder && sortOrder.length > 0 && sortOrder !== 'undefined'
              ? sortOrder
              : 'ASC',
        },
      });
    } else {
      issues = await this.issuesRepository.findAndCount({
        where: this.buildSearchQuery({
          user: user,
          progress: IssueProgress.Completed,
          filterTags: filters,
          drugQuery: query,
        }),
        skip: skip,
        take: parseInt(limit),
        order: {
          [resolveSortFields(sortField)]:
            sortOrder && sortOrder.length > 0 && sortOrder !== 'undefined'
              ? sortOrder
              : 'ASC',
        },
      });
    }
    return issues;
  }

  async findOne(id: string) {
    const issue = await this.issuesRepository.findOne({
      where: { _id: new ObjectId(id) },
    });
    return issue;
  }

  async findDrugIssues(drugId: string) {
    return await this.issuesRepository.find({
      where: {
        'drugId._id': drugId.toString(),
        status: { $ne: IssueProgress.Completed },
      },
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
    const issue = await this.issuesRepository.findOne({
      where: { _id: new ObjectId(id) },
    });
    const notes = await this.notesService.create({
      note: updateIssueDto.note,
      created_by: new ObjectId(issue.created_by._id),
    });
    // or if role is of an admin or superAdmin then allow to update...
    // if only user role type then check if requesting user ID and assignedto userId are matching.
    if (
      user.roles.includes(Role.Admin) ||
      user.roles.includes(Role.SuperAdmin) ||
      user.userId === issue.assigned_to
    ) {
      return await this.issuesRepository.update(new ObjectId(id), {
        ...updateIssueDto,
        last_note: {
          _id: notes._id,
          note: notes.note,
          created_by: notes.created_by,
        },
      });
    }

    throw new BadRequestException('User not allowed to update this record');
  }

  async deleteMany(ids: string[]) {
    return await this.issuesRepository.deleteMany(ids);
  }

  buildSearchQuery({ user, progress, filterTags, drugQuery }) {
    const todayIs = new Date();
    const progressOp = progress == IssueProgress.Completed ? '$eq' : '$ne';
    let today = false;
    let searchQueryObject: any = {};

    if (filterTags.length > 0) {
      if (typeof filterTags !== typeof new Array()) {
        filterTags = filterTags.toString().split(',');
        // we need to check for this created an array with an empty string..
        if (filterTags[0] !== undefined && filterTags[0].length === 0) {
          // this means an array was created with an empty string...
          filterTags.pop();
        }

        if (filterTags.includes('Issues for today')) {
          filterTags = filterTags.filter((item) => item != 'Issues for today');
          today = true;
        }
      }
    }

    let filters = [...filterTags];
    if (today) {
      searchQueryObject.due_date = {
        $gte: new Date(
          todayIs.getFullYear(),
          todayIs.getMonth(),
          todayIs.getDate(),
        ).toISOString(),
        $lt: new Date(
          todayIs.getFullYear(),
          todayIs.getMonth(),
          todayIs.getDate() + 1,
        ).toISOString(),
      };
    }

    searchQueryObject.progress = { [progressOp]: IssueProgress.Completed };

    if (filters.length) {
      searchQueryObject.issue_type = { $in: filters };
    }

    if (
      user.roles.length === 1 && user.roles.includes(Role.User)
    ) {
      // searchQueryObject.assigned_to = { _id: { $eq: user.userId } };
      searchQueryObject = {...searchQueryObject, 'assigned_to._id': new ObjectId(user.userId) };
    }

    if (drugQuery) {
      let queryWords = drugQuery.split(' ');
      queryWords = queryWords.map((word) => {
        const word2Number = parseInt(word.replace(/^\D+|\D+$/g, ''));
        if (isNaN(word2Number)) {
          return word;
        } else {
          return word2Number;
        }
      });

      const queryDrugName = queryWords.find((word) => {
        return typeof word == typeof 'string';
      });
      const queryDrugDose = queryWords.find((word) => {
        return typeof word == typeof 1;
      });
      if (queryDrugName) {
        searchQueryObject = {
          ...searchQueryObject,
          'drugId.name': {
            $regex: new RegExp(queryDrugName, 'i'),
          },
        };
      }

      if (queryDrugDose) {
        searchQueryObject = {
          ...searchQueryObject,
          'drugId.dosage': { $lte: queryDrugDose },
        };
      }
    }
    console.log(searchQueryObject);
    return searchQueryObject;
  }
}
