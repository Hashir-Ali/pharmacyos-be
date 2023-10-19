import { Injectable } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Note } from './entities/note.entity';
import { MongoRepository } from 'typeorm';
import { ObjectId } from 'mongodb';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note)
    private NoteRepository: MongoRepository<Note>,
  ) {}

  async create(createNoteDto: CreateNoteDto) {
    return await this.NoteRepository.save(createNoteDto);
  }

  async findAll() {
    return await this.NoteRepository.find();
  }

  async findByIssue(issue_id: string) {
    return await this.NoteRepository.find({
      where: { issue: new ObjectId(issue_id) },
    });
  }

  findOne(id: string) {
    return this.NoteRepository.findOne({ where: { _id: new ObjectId(id) } });
  }

  update(id: string, updateNoteDto: UpdateNoteDto) {
    return this.NoteRepository.update(id, updateNoteDto);
  }
}
