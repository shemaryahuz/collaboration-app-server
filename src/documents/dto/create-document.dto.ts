import { IsNotEmpty, IsOptional } from "class-validator";
import { DOCUMENT_ERROR_MESSAGES } from "../documents.constants.js";

export class CreateDocumentDto {
    @IsNotEmpty({ message: DOCUMENT_ERROR_MESSAGES.titleRequired })
    title: string;

    @IsOptional()
    isPublic?: boolean;

    ownerId: string;
}
