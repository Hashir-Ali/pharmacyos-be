import { Column, Entity, ManyToOne } from 'typeorm';
import { ObjectId } from 'mongodb';
import { BasicEntity } from 'src/common/base.entity';
import { Issue } from 'src/issues/entities/issue.entity';

@Entity('Note')
export class Note extends BasicEntity {
  //   @ManyToOne(() => Issue, (Issue) => Issue.notes)
  @Column()
  issue: ObjectId | string;

  @Column()
  note: string;

  @Column()
  created_by: ObjectId | string;
}
