import { Request, Response } from 'express';
import { ExpressionsService } from '../services/Expressions.service';
import { expressionsRepository } from '../repository/expressions.repository';
import { Phrase } from '../models/model';

const expressionsRepositoryInstance = new expressionsRepository()
const service = new ExpressionsService(expressionsRepositoryInstance)

export async function AllPhrase(req: Request, res: Response) {
    try {
        const phrases = await service.getAllPhrases();
        res.json(phrases);
    } catch (error: any) {
        res.status(error.statusCode).json( error );
    }
}

export async function PhraseById(req: Request, res: Response) {
    const id = parseInt(req.params.id, 10)
    try {
        const phrase = await service.getPhraseById(id)
        res.status(200).json(phrase)
    } catch (error: any) {
        res.status(error.statusCode).json( error );
    }
}

export async function AddPhrase(req: Request, res: Response) {
    const phrase = req.body
    try {
        await service.addPhrase(phrase as Phrase)
        res.status(201).json({
            message: 'Phrase added successfully',
            data: phrase
        })
    } catch (error: any) {
        res.status(error.statusCode).json( error );
    }
}

export async function UpdatePhrase(req: Request, res: Response) {
    const id = parseInt(req.params.id, 10)
    const updatePhrase = req.body
    try {
        await service.updatePhrase( id, updatePhrase as Phrase)
        res.status(201).json({
            message: 'Phrase added successfully',
            data: updatePhrase
        })
    } catch (error: any) {
        res.status(error.statusCode).json( error );
    }
}

export async function DeletePhrase(req: Request, res: Response){
    const id = parseInt(req.params.id, 10)
    try {
        await service.deletePhrase(id)
        res.status(200).json({
            message: 'Phrase deleted successfully',
            data: id
        })
    } catch (error: any) {
        res.status(error.statusCode).json( error );
    }
}

/// words 

export function AllWords(req: Request, res: Response) {
    res.status(200).json({
        message: 'All word keep',
        data: [
            { id: 1, phrase: 'Hello' },
            { id: 2, phrase: 'world' },
            { id: 2, phrase: 'goodbye' }
        ]
    })
}

export function WordsById(req: Request, res: Response) {
    res.status(200).json({
        message: 'All word keep',
        data: [
            { id: 1, phrase: 'Hello' }
        ]
    })
}