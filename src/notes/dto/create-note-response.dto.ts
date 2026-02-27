import { ApiProperty } from '@nestjs/swagger';
import { NoteDto } from './notes.dto';

export class CreateNoteResponseDto {
  @ApiProperty({ type: NoteDto })
  result: NoteDto;
}
