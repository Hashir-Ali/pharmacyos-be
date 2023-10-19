import { BasicEntity } from 'src/common/base.entity';
import { Entity, Column, OneToMany } from 'typeorm';
import { ObjectId } from 'mongodb';
import { Note } from 'src/notes/entities/note.entity';

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
  issue_type: IssueTypes;

  @Column()
  description: string;

  @Column()
  due_date: Date;

  @Column()
  created_by: ObjectId | string;

  @Column()
  assigned_to: ObjectId | string;

  @Column({
    type: 'enum',
    enum: IssueProgress,
  })
  progress: IssueProgress;

  // @OneToMany(() => Note, (Note) => Note.issue)
  // notes: Note[];
}
