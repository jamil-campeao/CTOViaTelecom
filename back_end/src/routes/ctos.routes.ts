import { Router } from 'express';
import { getUltimoCTO, postCTO, getCTOByID, getCTO } from '../controllers/ctos.controller';

const router = Router();

router.get('/', getCTO);
router.post('/', postCTO);
router.get('/:id', getCTOByID); // Rota para obter CTO por ID 
router.get('/ultimo', getUltimoCTO);

export default router;