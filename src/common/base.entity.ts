import {
  Column,
  CreateDateColumn,
  ObjectIdColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class BasicEntity {
  @ObjectIdColumn()
  _id?: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  Updated_at: Date;

  @Column({ type: 'boolean', default: true })
  is_enabled: Boolean;
}
