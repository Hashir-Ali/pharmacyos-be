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
  drugId: { name: string; dosage: number; unit: string; type: string } | string;

  @Column()
  issue_type: string;

  @Column()
  description: string;

  @Column({ type: 'date' })
  due_date: Date;

  @Column()
  created_by: { _id: ObjectId; firstName: string; lastName: string };

  @Column({
    type: 'date',
  })
  closing_date: Date | null;

  @Column()
  assigned_to: { _id: ObjectId; firstName: string; lastName: string } | string;

  @Column({
    type: 'enum',
    enum: IssueProgress,
  })
  progress: IssueProgress;

  @Column()
  last_note: { _id: ObjectId; note: string; created_by: ObjectId } | null;
}
