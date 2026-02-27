import { ApiProperty } from '@nestjs/swagger';

export class NoteDto {
  @ApiProperty({ example: '12345678', required: true })
  id: string;

  @ApiProperty({ example: 'Note title', required: true })
  title: string;

  @ApiProperty({ example: 'Note description', required: true })
  description: string;
}
