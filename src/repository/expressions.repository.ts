import { Phrase } from '../models/model'
import { JsonReader } from '../utils/json.reader';

export class expressionsRepository{
    private phrases: Phrase[] = []

    constructor() {
        this.loadData();
    }

    private async loadData() {
        this.phrases = await new JsonReader<Phrase[]>('src/services/json/phrase.json').read();
    }

    public async getAll(): Promise<Phrase[]> {
        return [ ...this.phrases ]
    }

    public async getById(id: number): Promise<Phrase | undefined > {
        return this.phrases.find(phrase => phrase.id === id)
    }   

    public async add(phrase: Phrase): Promise<void> {
        this.phrases.push(phrase)
    }

    public async update(id: number, updatePhrase: Phrase): Promise<void> {
        const index = this.phrases.findIndex(phrase => phrase.id === id)
        if(index === -1) return
        this.phrases[index] = { ...this.phrases[index], ...updatePhrase}
    }

    public async delete(id: number): Promise<void> {
        this.phrases = this.phrases.filter(phrase => phrase.id !== id)
    }
}