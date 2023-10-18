import { BasicEntity } from 'src/common/base.entity';
import { Entity, Column } from 'typeorm';
import { ObjectId } from 'mongodb';

export enum IssueTypes {
  RuleNeedsAttention = 'Rule Needs Attention',
  LTSupplyIssue = 'LT supply issue',
  OrderOverdue = 'Order Overdue',
}

export enum IssueProgress {
  InProgress = 'In Progress',
  Completed = 'Completed',
}

@Entity('Issue')
export class Issue extends BasicEntity {
  @Column()
  drugId: ObjectId | string;

  @Column({
    type: 'enum',
    enum: IssueTypes,
  })
  issue_type: IssueTypes[];

  @Column()
  description: string;

  @Column()
  due_date: Date;

  @Column()
  created_by: ObjectId | string;

  @Column({
    type: 'enum',
    enum: IssueProgress,
  })
  progress: IssueProgress;

  @Column()
  notes: string[];

  @Column({
    type: 'boolean',
    default: true,
  })
  is_closed: boolean;
}
