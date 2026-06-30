export class Document {
    id: string;
    ownerId: string;
    title: string;

    constructor(partial: Partial<Document>) {
        Object.assign(this, partial);
    }
}
