import { API_URL } from './config.js';

async function getCidades() {
    try {
        const response = await fetch(API_URL + 'cidades', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            const result = await response.json();
            return result.map(cidade => {
                return {
                    id: cidade.CID_CODIGO,
                    nome: cidade.CID_NOME,
                    uf: cidade.CID_UF,
                    ibge: cidade.CID_IBGE
                };
            });
        }
        else {
            throw new Error('Erro ao carregar cidades: ' + response.statusText);
        }
    }
    catch (error) {
        console.error('Erro ao carregar cidades:', error);
        throw error;
    }
};

async function getTecnicos() {
    try {
        const response = await fetch(API_URL + 'tecnicos', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            const result = await response.json();

            // Aqui agora está certo
            return result.map(tecnico => ({
                id: tecnico.TEC_CODIGO,
                nome: tecnico.TEC_NOME,
                situacao: tecnico.TEC_SITUACAO
            }));
        } else {
            throw new Error('Erro ao carregar técnicos: ' + response.statusText);
        }
    } catch (error) {
        console.error('Erro ao carregar técnicos:', error);
        throw error;
    }
};

async function postCTO(tecnicoCodigo, cidadeCodigo, data) {
    try {
        const response = await fetch(API_URL + 'ctos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                TEC_CODIGO: tecnicoCodigo,
                CID_CODIGO: cidadeCodigo,
                CTO_DATA: new Date(data).toISOString().slice(0, 10) // Formato YYYY-MM-DD
            })
        });

        if (response.ok) {
            const result = await response.json();
            return result;
        }
        else {
            throw new Error('Erro ao criar CTO: ' + response.statusText);
        }
    }
    catch (error) {
        console.error('Erro ao criar CTO:', error);
        throw error;
    }
};

async function getUltimoCTO() {
    try {
        const response = await fetch(API_URL + 'ctos/ultimo', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            const result = await response.json();
            
            return {
                CTO_CODIGO: result.CTO_CODIGO,
                TEC_CODIGO: result.TEC_CODIGO,
                TEC_NOME: result.TEC_NOME,
                CID_CODIGO: result.CID_CODIGO,
                CID_UF: result.CID_UF,
                CID_NOME: result.CID_NOME,
                CTO_DATA: result.CTO_DATA
            };
        }
    }
    catch (error) {
        console.error('Erro ao carregar último CTO:', error);
        throw error;
    }
};

async function postTecnico(nomeTecnico, situacaoTecnico) {
    const situacaoInt = parseInt(situacaoTecnico);

    try {
        const response = await fetch(API_URL + 'tecnicos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nome: nomeTecnico,
                situacao: situacaoInt
            })
        });

        if (response.created) {
            const result = await response.json();
            return result;
        } else {
            throw new Error('Erro ao criar técnico: ' + response.statusText);
        }
    } catch (error) {
        console.error('Erro ao criar técnico:', error);
        throw error;
    }
    
};

async function getCTOByID(CTO_CODIGO) {
    try {
        const response = await fetch(API_URL + 'ctos/' + CTO_CODIGO, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            const result = await response.json();
            return result;
        } else {
            throw new Error('Erro ao carregar CTO: ' + response.statusText);
        }
    } catch (error) {
        console.error('Erro ao carregar CTO:', error);
        throw error;
    }
};

async function postCidade (nomeCidade, cepCidade, ufCidade, ibgeCidade) {
    try {
        const response = await fetch(API_URL + 'cidades', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nome: nomeCidade,
                cep: cepCidade,
                estado: ufCidade,
                cod_ibge: ibgeCidade
            })
        });

        if (response.ok) {
            const result = await response.json();
            return result;
        } else {
            throw new Error('Erro ao criar cidade: ' + response.statusText);
        }
    } catch (error) {
        console.error('Erro ao criar cidade:', error);
        throw error;
    }
};

async function putTecnicos(tecnicoCodigo, situacaoTecnico) {

    try {
        const response = await fetch(API_URL + 'tecnicos/' + tecnicoCodigo, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                situacao: situacaoTecnico
            })
        });

        if (response.ok) {
            const result = await response.json();
            return result;
        } else {
            throw new Error('Erro ao atualizar técnico: ' + response.statusText);
        }
    } catch (error) {
        console.error('Erro ao atualizar técnico:', error);
        throw error;
    }
}


export { getCidades, getTecnicos, postCTO, getUltimoCTO, postTecnico, getCTOByID, postCidade, putTecnicos };