"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ctos_controller_1 = require("../controllers/ctos.controller");
const router = (0, express_1.Router)();
router.get('/', ctos_controller_1.getCTO);
router.post('/', ctos_controller_1.postCTO);
router.get('/:id', ctos_controller_1.getCTOByID); // Rota para obter CTO por ID 
router.get('/ultimo', ctos_controller_1.getUltimoCTO);
exports.default = router;
