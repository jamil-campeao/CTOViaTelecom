import { Router } from 'express';
import { getUltimoCTO, postCTO, getCTOByID } from '../controllers/ctos.controller';

const router = Router();

router.get('/ultimo', getUltimoCTO);
router.get('/:id', getCTOByID); // Rota para obter CTO por ID
router.post('/', postCTO);

export default router;