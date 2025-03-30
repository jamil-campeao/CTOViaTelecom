import { PrismaClient } from '@prisma/client';
import express, {Request, Response} from 'express';
import cors from 'cors';


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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

    