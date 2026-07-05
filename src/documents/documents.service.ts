import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service.js';
import { CreateDocumentDto } from './dto/create-document.dto.js';
import { Document } from './entities/document.entity.js';

@Injectable()
export class DocumentsService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createDocumentDto: CreateDocumentDto): Promise<Document> {
    return this.prisma.document.create({ data: createDocumentDto });
  }

  async findAll(userId: string) {
    return this.prisma.document.findMany({
      where: {
        OR: [
          { ownerId: userId },
          { collaborations: { some: { userId } } }
        ]
      },
      include: {
        owner: { select: { name: true, email: true } },
      },
      orderBy: { updatedAt: 'desc' },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} document`;
  }

  async update(id: string, updateDocumentDto: CreateDocumentDto) {
    return this.prisma.document.update({
      where: { id },
      data: updateDocumentDto,
    });
  }

  remove(id: number) {
    return `This action removes a #${id} document`;
  }
}
