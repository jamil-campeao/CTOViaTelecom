import { Request, Response } from 'express';
import prisma from '../db/client';

// Rota para listar técnicos
export const getTecnicos =  async (req: Request, res: Response) => {
    try {
        const tecnicos = await prisma.tecnico.findMany({
            where : {
                TEC_SITUACAO: "Ativo"
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
    const { TEC_NOME, TEC_SITUACAO} = req.body;
    // Validações
    if (!TEC_NOME || !TEC_SITUACAO) {
        res.status(400).json( { error: 'Nome e situação são obrigatórios' });
        return;
    }

    try {
        const tecnico = await prisma.tecnico.create({
            data: {
                TEC_NOME,
                TEC_SITUACAO
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
    const { TEC_SITUACAO } = req.body;

    // Validações
    if (!TEC_SITUACAO) {
        res.status(400).json({ error: 'situação não informada' });
        return;
    }

    try {
        const tecnico = await prisma.tecnico.update({
            where: { TEC_CODIGO: Number(id) },
            data: {
                TEC_SITUACAO
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
