import { Request, Response } from 'express';
import prisma from '../db/client';

// Rota para listar técnicos
export const getTecnicos =  async (req: Request, res: Response) => {
    try {
        const tecnicos = await prisma.tecnico.findMany({
            where : {
                TEC_SITUACAO: 1 // Situação ativa
        }});
        res.json(tecnicos);
    }
    catch (error) {
        console.error('Erro ao buscar técnicos:', error);
        res.status(500).json({ error: 'Erro ao buscar técnicos' });
        
    }
};

// Rota para cadastrar técnico
export const postTecnico =  async (req: Request, res: Response) => {
    const { nome, situacao} = req.body;
    // Validações
    if (!nome || !situacao) {
        res.status(400).json( { error: 'Nome e situação são obrigatórios' });
        return;
    }

    let situacaoInt = parseInt(situacao);

    try {
        const tecnico = await prisma.tecnico.create({
            data: {
                TEC_NOME: nome,
                TEC_SITUACAO: situacaoInt
            }
        });

        res.status(201).json(tecnico);

    }
    catch (error) {
        console.error('Erro ao criar técnico:', error);
        res.status(500).json({ error: 'Erro ao criar técnico'});
    }
};

export const putTecnico = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { situacao } = req.body;

    // Validações
    if (!situacao) {
        res.status(400).json({ error: 'situação não informada' });
        return;
    }
    let situacaoInt;

    if (situacao == "Ativo") {
        situacaoInt = 1;
    }
    else {
        situacaoInt = 0;
    }

    try {
        const tecnico = await prisma.tecnico.update({
            where: { TEC_CODIGO: Number(id) },
            data: {
                TEC_SITUACAO: situacaoInt
            }
        });

        res.status(201).json({sucess: true, message: 'Técnico atualizado com sucesso', tecnico});
    } catch (error) {
        console.error('Erro ao atualizar técnico:', error);
        res.status(500).json({ error: 'Erro ao atualizar técnico' });
    }
};

export const getTodosTecnicos = async (req: Request, res: Response) => {
    try {
        const tecnicos = await prisma.tecnico.findMany({
            orderBy: {
                TEC_NOME: 'asc'
            }
        });
        res.json(tecnicos);
    } catch (error) {
        console.error('Erro ao buscar técnicos:', error);
        res.status(500).json({ error: 'Erro ao buscar técnicos' });
    }
};
