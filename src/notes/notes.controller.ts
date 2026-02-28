import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { NotesService } from './notes.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import {
  CreateNoteResponseDto,
  GetNotesResponseDto,
  UpdateNoteDto,
  CreateNoteDto,
  UpdateNoteResponseDto,
} from './dto';
import { AuthGuard } from '@/auth/auth.guard';

@Controller('api/notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new note' })
  @ApiResponse({
    status: 201,
    description: 'Note created successfully.',
    type: CreateNoteResponseDto,
  })
  @UseGuards(AuthGuard)
  create(@Body() createNoteDto: CreateNoteDto) {
    return this.notesService.create(createNoteDto);
  }

  @ApiOperation({ summary: 'Get all notes' })
  @ApiResponse({
    status: 200,
    description: 'List of notes.',
    type: GetNotesResponseDto,
  })
  @Get()
  @UseGuards(AuthGuard)
  findAll() {
    return this.notesService.findAll();
  }

  @ApiOperation({ summary: 'Get a note by ID' })
  @ApiResponse({
    status: 200,
    description: 'Note details.',
    type: CreateNoteResponseDto,
  })
  @Get(':id')
  @UseGuards(AuthGuard)
  findOne(@Param('id') id: string) {
    return this.notesService.findOne(id);
  }

  @ApiOperation({ summary: 'Update a note by ID' })
  @ApiResponse({
    status: 200,
    description: 'Note updated successfully.',
    type: UpdateNoteResponseDto,
  })
  @Patch(':id')
  @UseGuards(AuthGuard)
  update(@Param('id') id: string, @Body() updateNoteDto: UpdateNoteDto) {
    return this.notesService.update(id, updateNoteDto);
  }

  @ApiOperation({ summary: 'Delete a note by ID' })
  @ApiResponse({
    status: 200,
    description: 'Note deleted successfully.',
  })
  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param('id') id: string) {
    return this.notesService.remove(id);
  }
}
