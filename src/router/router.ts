import { Router } from 'express';
import { AllPhrase, PhraseById, AllWords, WordsById, AddPhrase, UpdatePhrase, DeletePhrase } from '../controllers/controller';

const router = Router();

router.get('/', AllPhrase)
router.get('/:id', PhraseById)
router.post('/', AddPhrase)
router.put('/:id', UpdatePhrase)
router.delete('/:id', DeletePhrase)



router.get('/all-words', AllWords)
router.get('/word', WordsById)

export default router