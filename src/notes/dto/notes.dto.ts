import { ApiProperty } from '@nestjs/swagger';

export class NoteDto {
  @ApiProperty({ example: '12345678', required: true })
  id: string;

  @ApiProperty({ example: 'Note title', required: true })
  title: string;

  @ApiProperty({ example: 'Note description', required: false, nullable: true })
  description: string | null;

  @ApiProperty({ example: 'Note creator', required: true })
  userId: string;
}
