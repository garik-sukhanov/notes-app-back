import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateNoteDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Note title', required: true })
  title: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Note description', required: true })
  description: string;
}
