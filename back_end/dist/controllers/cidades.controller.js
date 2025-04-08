"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postCidade = exports.getCidades = void 0;
const client_1 = __importDefault(require("../db/client"));
;
// Rota para obter cidades
const getCidades = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cidades = yield client_1.default.cidade.findMany();
        res.json(cidades);
    }
    catch (error) {
        console.error('Erro ao buscar cidades:', error);
        res.status(500).json({ error: 'Erro ao buscar cidades' });
    }
});
exports.getCidades = getCidades;
//Rota para cadastrar cidade
const postCidade = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { CID_NOME, CID_UF, CID_CEP, CID_IBGE } = req.body;
    // Validações
    if (!CID_NOME || !CID_UF || !CID_IBGE || !CID_CEP) {
        res.status(400).json({ error: 'Nome, estado, código IBGE e CEP são obrigatórios' });
        return;
    }
    const codigoIBGEExiste = yield client_1.default.cidade.findFirst({
        where: {
            CID_IBGE: CID_IBGE // Verifica se o código IBGE já existe
        }
    });
    if (codigoIBGEExiste) {
        res.status(400).json({ error: 'Código IBGE já cadastrado' });
        return;
    }
    try {
        const cidade = yield client_1.default.cidade.create({
            data: {
                CID_NOME,
                CID_UF,
                CID_CEP,
                CID_IBGE
            }
        });
        res.status(201).json(cidade);
    }
    catch (error) {
        console.error('Erro ao criar cidade:', error);
        res.status(500).json({ error: 'Erro ao criar cidade' });
    }
});
exports.postCidade = postCidade;
