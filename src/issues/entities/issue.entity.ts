import { BasicEntity } from 'src/common/base.entity';
import { Entity, Column } from 'typeorm';
import { ObjectId } from 'mongodb';

export enum IssueProgress {
  InProgress = 'In Progress',
  Completed = 'Completed',
}

@Entity('Issue')
export class Issue extends BasicEntity {
  @Column()
  drugId: ObjectId | string;

  @Column()
  issue_type: ObjectId | string;

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
