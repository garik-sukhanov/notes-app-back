import { Injectable } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-notes.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NoteEntity } from '@/shared/models/note.entity';
import { UserEntity } from '@/shared/models/user.entity';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(NoteEntity)
    private noteRepo: Repository<NoteEntity>,
  ) {}

  async create(userId: string, createNoteDto: CreateNoteDto) {
    const owner = new UserEntity();
    owner.id = userId;
    const result = await this.noteRepo.save({
      title: createNoteDto.title,
      description: createNoteDto.description,
      user: owner,
    });
    return { data: result };
  }

  async findAll(userId: string, page = 1, size = 10) {
    const [result, total] = await this.noteRepo.findAndCount({
      where: { user: { id: userId } },
      order: { createdAt: 'DESC' },
      skip: (page - 1) * size,
      take: size,
    });
    const pagination = {
      total,
      page,
      size,
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
