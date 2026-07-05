import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, NotFoundException } from '@nestjs/common';

import { AuthGuard } from '../auth/auth.guard.js';
import { type AuthenticatedRequest, getAuthenticatedUserId } from '../auth/auth.types.js';
import { DocumentsService } from './documents.service.js';
import { CreateDocumentDto } from './dto/create-document.dto.js';
import { DOCUMENT_ERROR_MESSAGES, DOCUMENT_SUCCESS_MESSAGES } from './documents.constants.js';

@Controller('documents')
@UseGuards(AuthGuard)
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) { }

  @Post()
  async create(
    @Body() createDocumentDto: CreateDocumentDto,
    @Req() req: AuthenticatedRequest
  ) {
    createDocumentDto.ownerId = getAuthenticatedUserId(req);

    const document = await this.documentsService.create(createDocumentDto);

    return { document, message: DOCUMENT_SUCCESS_MESSAGES.documentCreated };
  }

  @Get()
  async findAll(@Req() req: AuthenticatedRequest) {
    const userId = getAuthenticatedUserId(req);

    const documents = await this.documentsService.findAll(userId);

    if (!documents || documents.length === 0) {
      throw new NotFoundException(DOCUMENT_ERROR_MESSAGES.documentsNotFound);
    }

    return { documents, message: DOCUMENT_SUCCESS_MESSAGES.documentsRetrieved };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.documentsService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDocumentDto: CreateDocumentDto,
  ) {
    try {
      const updatedDocument = await this.documentsService.update(id, updateDocumentDto);

      return { document: updatedDocument, message: DOCUMENT_SUCCESS_MESSAGES.documentUpdated };

    } catch (error) {
      throw new NotFoundException(DOCUMENT_ERROR_MESSAGES.documentNotFound);
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.documentsService.remove(+id);
  }
}
