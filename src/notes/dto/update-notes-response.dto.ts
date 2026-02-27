import { ApiProperty } from '@nestjs/swagger';
import { NoteDto } from './notes.dto';

export class UpdateNoteResponseDto {
  @ApiProperty({ type: NoteDto })
  result: NoteDto;
}
