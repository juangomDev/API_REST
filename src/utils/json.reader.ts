import * as fs from 'fs/promises';
import path from 'path';
import { JsonReaderError } from './errorHandler';


export class JsonReader<T = unknown> {
    constructor(private readonly filePath: string) {}

    public async read(): Promise<T> {
        try {
            const absolutePath = path.resolve(this.filePath);
            
            await this.validateFileExists(absolutePath);
            
            const data = await fs.readFile(absolutePath, 'utf-8');
            const parsedData = this.safeJsonParse(data);
            
            if ('phrases' in parsedData) {
                return parsedData.phrases as T;
            }
            return parsedData as T;
        } catch (error) {
            throw new JsonReaderError(`Failed to read JSON file at ${this.filePath}`, { error } );
        }
    }

    private async validateFileExists(filePath: string): Promise<void> {
        try {
            await fs.access(filePath, fs.constants.F_OK | fs.constants.R_OK);
        } catch {
            throw new JsonReaderError(`File not found or not readable: ${filePath}`);
        }
    }

    private safeJsonParse(data: string): any {
        try {
            return JSON.parse(data);
        } catch (parseError) {
            throw new JsonReaderError('Invalid JSON format', {parseError});
        }
    }
}


