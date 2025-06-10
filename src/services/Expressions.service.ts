import { Phrase } from '../models/model'
import { expressionsRepository } from '../repository/expressions.repository';
import { NotFoundError } from '../utils/error/errorHandler'

export class ExpressionsService {
    private repository: expressionsRepository;

    constructor(repository: expressionsRepository) {
        this.repository = repository
    }

    public getAllPhrases(): Promise<Phrase[]> {
        return this.repository.getAll()
    }

    public async getPhraseById(id: number): Promise<Phrase | undefined > {
        const phrase = await this.repository.getById(id)
        if(!phrase) throw new NotFoundError('Phrase not found')
        return phrase
    }

    public async addPhrase(phrase: Phrase): Promise<void> {
        if(!phrase?.expression?.trim() || !phrase?.expression?.trim()) {
            throw new Error('Invalid phrase data')
        }
        await this.repository.add(phrase)
    }

    public async updatePhrase(id: number, updatePhrase: Phrase): Promise<void> {
        if(!updatePhrase || !updatePhrase.expression || !updatePhrase.meaning) {
            throw new Error('Invalid phrase data')
        }
        await this.getPhraseById(id)
        await this.repository.update(id, updatePhrase)
    }

    public async deletePhrase(id: number): Promise<void> {
        await this.getPhraseById(id)
        await this.repository.delete(id)
    }
}


