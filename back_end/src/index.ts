import { PrismaClient } from '@prisma/client';
import express, {Request, Response} from 'express';
import cors from 'cors';
import { create } from 'domain';


const prisma = new PrismaClient();
const app = express();

app.use(cors());
app.use(express.json());


// Rota para obter cidades
app.get('/cidades', async (req: Request, res: Response) => {
    try {
        const cidades = await prisma.cidade.findMany();
        res.json(cidades);
    }
    catch (error) {
        console.error('Erro ao buscar cidades:', error);
        res.status(500).json({ error: 'Erro ao buscar cidades' });
    }
});

//Rota para cadastrar cidade
app.post('/cidades', async (req: Request, res: Response) => {
    const { nome, estado, cep, cod_ibge } = req.body;

    // Validações
    if (!nome || !estado || !cod_ibge) {
        res.status(400).json({ error: 'Nome, estado e código IBGE são obrigatórios' });
        return;
    }
    if (cep && !/^\d{5}-\d{3}$/.test(cep)) {
        res.status(400).json({ error: 'CEP inválido' });
        return;
    }

    try {
        const cidade = await prisma.cidade.create({
            data: {
                CID_NOME: nome,
                CID_UF: estado,
                CID_CEP: cep,
                CID_IBGE: cod_ibge
            }
        });

        res.status(201).json(cidade);
    }
    catch (error) {
        console.error('Erro ao criar cidade:', error);
        res.status(500).json({ error: 'Erro ao criar cidade'});
    }
});

// Rota para listar técnicos
app.get('/tecnicos', async (req: Request, res: Response) => {
    try {
        const tecnicos = await prisma.tecnico.findMany();
        res.json(tecnicos);
    }
    catch (error) {
        console.error('Erro ao buscar técnicos:', error);
        res.status(500).json({ error: 'Erro ao buscar técnicos' });
        
    }
});

// Rota para cadastrar técnico
app.post('/tecnicos', async (req: Request, res: Response) => {
    const { nome, situacao} = req.body;
    // Validações
    if (!nome || !situacao) {
        res.status(400).json( { error: 'Nome e situação são obrigatórios' });
        return;
    }

    try {
        const tecnico = await prisma.tecnico.create({
            data: {
                TEC_NOME: nome,
                TEC_SITUACAO: situacao
            }
        });

    }
    catch (error) {
        console.error('Erro ao criar técnico:', error);
        res.status(500).json({ error: 'Erro ao criar técnico'});
    }
});

//Rota para listar dados do ultimo CTO lançado
app.get('/ultimocadastro', async (req: Request, res: Response) => {
    try {
        const cto = await prisma.cTO.findMany({
            orderBy: {
                CTO_CODIGO: 'desc'
            },
            take: 1
        });
    }
    catch (error) {
        console.error('Erro ao buscar último CTO:', error);
        res.status(500).json({ error: 'Erro ao buscar último CTO' });
    }
});

// Rota para cadastrar CTO
app.post('/ctos', async (req: Request, res: Response) => {
    try {
        const {codigoTecnico, codigoCidade, dataCto, hora} = req.body;

        //Validações
        if (!codigoTecnico || !codigoCidade || !dataCto || !hora) {
            res.status(400).json({ error: 'Código do técnico, código da cidade, data e hora são obrigatórios' });
            return;
        }

        const cto = await prisma.cTO.create({
            data: {
                TEC_CODIGO: codigoTecnico,
                CID_CODIGO: codigoCidade,
                CTO_DATA: dataCto
            }
        });

    }
    catch (error) {
        console.error('Erro ao criar CTO:', error);
        res.status(500).json({ error: 'Erro ao criar CTO'});
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

    