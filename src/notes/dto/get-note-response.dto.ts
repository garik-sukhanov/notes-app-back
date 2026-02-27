import { ApiProperty } from '@nestjs/swagger';
import { NoteDto } from './notes.dto';

export class GetNoteResponseDto {
  @ApiProperty({ type: NoteDto })
  result: NoteDto;
}
