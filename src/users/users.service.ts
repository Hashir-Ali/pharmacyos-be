import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { MongoRepository } from 'typeorm';
import { CreateUserDto } from './dto/create-user-dto';
import { ObjectId } from 'mongodb';
import { UpdateUserDto } from './dto/update-user-dto';
import { encodePassword } from 'src/common/utils';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: MongoRepository<User>,
  ) {}

  async findOne(id: string | ObjectId): Promise<User | undefined> {
    const user = await this.userRepository.findOne({
      where: { _id: new ObjectId(id) },
    });
    delete user.password;
    return user;
  }

  async findAll() {
    return this.userRepository.find();
  }

  async create(data: CreateUserDto) {
    const password = encodePassword(data.password);
    const newData = { ...data, password: password };
    return await this.userRepository.save(newData);
  }

  async findOneByMail(email: string) {
    return await this.userRepository.findOneBy({ where: { email: email } });
  }

  async update(id: ObjectId | string, updateUserDto: UpdateUserDto) {
    return this.userRepository.update(id, updateUserDto);
  }
}
