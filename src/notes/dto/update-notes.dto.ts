import { PartialType } from '@nestjs/swagger';
import { NoteDto } from './notes.dto';

export class UpdateNoteDto extends PartialType(NoteDto) {}
