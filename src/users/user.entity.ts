import { Role } from 'src/common/role.enum';
import { Column, Entity, ObjectIdColumn } from 'typeorm';

@Entity('users')
export class User {
  @ObjectIdColumn()
  _id: string;

  @Column({ default: ' ' })
  first_name: string;

  @Column({ default: ' ' })
  last_name: string;

  @Column({unique: true})
  email: string;

  @Column()
  password: string;

  @Column()
  roles: Role[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  date_registered: string;
}
