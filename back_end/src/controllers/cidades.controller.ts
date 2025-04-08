import { Request, Response } from 'express';
import prisma from '../db/client';;

// Rota para obter cidades
export const getCidades = async (req: Request, res: Response) => {
    try {
        const cidades = await prisma.cidade.findMany();
        res.json(cidades);
    }
    catch (error) {
        console.error('Erro ao buscar cidades:', error);
        res.status(500).json({ error: 'Erro ao buscar cidades' });
    }
};

//Rota para cadastrar cidade
export const postCidade = async (req: Request, res: Response) => {
    const { CID_NOME, CID_UF, CID_CEP, CID_IBGE } = req.body;

    // Validações
    if (!CID_NOME || !CID_UF || !CID_IBGE || !CID_CEP) {
        res.status(400).json({ error: 'Nome, estado, código IBGE e CEP são obrigatórios' });
        return;
    }

    const codigoIBGEExiste = await prisma.cidade.findFirst({
        where: {
            CID_IBGE: CID_IBGE // Verifica se o código IBGE já existe
        }
    });

    if (codigoIBGEExiste) {
        res.status(400).json({ error: 'Código IBGE já cadastrado' });
        return;
    }

    try {
        const cidade = await prisma.cidade.create({
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
        res.status(500).json({ error: 'Erro ao criar cidade'});
    }
};