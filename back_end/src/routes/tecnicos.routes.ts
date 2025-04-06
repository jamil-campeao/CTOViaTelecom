import { Router } from 'express';
import { getTecnicos, postTecnico, putTecnico, getTodosTecnicos } from '../controllers/tecnicos.controller';

const router = Router();

router.get('/todos', getTodosTecnicos);
router.get('/', getTecnicos);
router.post('/', postTecnico);
router.put('/:id', putTecnico);

export default router;