import { BasicEntity } from 'src/common/base.entity';
import { Column, Entity } from 'typeorm';

@Entity('IssueTypes')
export class IssueType extends BasicEntity {
  @Column()
  issue_type: string;
}
