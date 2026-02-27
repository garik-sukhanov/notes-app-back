import { ApiProperty } from '@nestjs/swagger';
import { NoteDto } from './notes.dto';
import { PaginationDto } from '@/shared/dto/pagination.dto';

export class GetNotesResponseDto {
  @ApiProperty({ type: [NoteDto] })
  result: NoteDto[];

  @ApiProperty({
    type: PaginationDto,
  })
  pagination: PaginationDto;
}
