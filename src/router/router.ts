import { Router } from 'express';
import { AllPhrase, PhraseById, AllWords, WordsById, AddPhrase, UpdatePhrase, DeletePhrase } from '../controllers/controller';

const phrasesRouter = Router();

phrasesRouter.route('/')
    .get(AllPhrase)
    .post(AddPhrase)

phrasesRouter.route('/:id')
    .get(PhraseById)
    .put(UpdatePhrase)
    .delete(DeletePhrase)

phrasesRouter.get('/all-words', AllWords)
phrasesRouter.get('/word', WordsById)

export default phrasesRouter 