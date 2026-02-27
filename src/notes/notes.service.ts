import { Injectable } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-notes.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NoteEntity } from '@/shared/models/note.entity';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(NoteEntity)
    private noteRepo: Repository<NoteEntity>,
  ) {}

  async create(createNoteDto: CreateNoteDto) {
    const result = await this.noteRepo.save(createNoteDto);
    return { data: result };
  }

  async findAll() {
    const result = await this.noteRepo.find();
    const pagination = {
      total: result.length,
      page: 1,
      size: 10,
    };

    return { data: result, pagination };
  }

  async findOne(id: string) {
    const result = await this.noteRepo.findOne({ where: { id } });
    return { data: result };
  }

  async update(id: string, updateNoteDto: UpdateNoteDto) {
    const result = await this.noteRepo.update(id, updateNoteDto);
    return { data: result };
  }

  async remove(id: string) {
    const result = await this.noteRepo.delete(id);
    return { data: result };
  }
}
