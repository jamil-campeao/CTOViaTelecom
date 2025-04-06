import { Router } from 'express';
import { getTecnicos, postTecnico, putTecnico, getTodosTecnicos } from '../controllers/tecnicos.controller';

const router = Router();

router.get('/todos', getTodosTecnicos); // Rota para obter todos os técnicos
router.put('/:id', putTecnico);
router.get('/', getTecnicos);
router.post('/', postTecnico);

export default router;