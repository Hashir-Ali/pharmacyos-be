import { BasicEntity } from 'src/common/base.entity';
import { Entity, Column, Index } from 'typeorm';
import { ObjectId } from 'mongodb';

export enum IssueProgress {
  InProgress = 'In Progress',
  Completed = 'Completed',
  todo = 'To Do',
}
@Entity('Issue')
export class Issue extends BasicEntity {
  @Column()
  drugId: ObjectId | string;

  @Column()
  issue_type: ObjectId | string;

  @Column()
  description: string;

  @Column({ type: 'date' })
  due_date: Date;

  @Column()
  created_by: ObjectId | string;

  @Column({
    type: 'date',
  })
  closing_date: Date;

  @Column()
  assigned_to: ObjectId | string;

  @Column({
    type: 'enum',
    enum: IssueProgress,
  })
  progress: IssueProgress;
}
