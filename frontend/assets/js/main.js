import { getTecnicos, getCidades, postCTO, getUltimoCTO, postTecnico, putTecnicos, getTodosTecnicos } from './api.js';
import { formatarDataParaTimestamp, formatadaDataRecebida } from '../../utils/helpers.js';

const formHome = document.getElementById('home');
const formAlterarTecnico = document.getElementById('formAlterarTecnico');
const formCadastroTecnico = document.getElementById('formCadastroTecnico');
const formConsultaCTO = document.getElementById('formConsultaCTO');


document.addEventListener("DOMContentLoaded", async () => {
    if (formHome) {
        const select = document.getElementById('descricao_tecnico');

        try {
            const tecnicos = await getTecnicos(); 

            tecnicos.forEach(tecnico => {
                const option = document.createElement('option');
                option.value = tecnico.id;
                option.textContent = tecnico.nome;
                option.dataset.situacao = tecnico.situacao;
                select.appendChild(option);
            });
        } catch (error) {
            console.error("Erro ao carregar técnicos:", error);
            alert("Erro ao carregar técnicos.");
        }
    }
});

document.addEventListener("DOMContentLoaded", async () => {
    if (formHome) {
        const select = document.getElementById('nome_cidade');

        try {
            const cidades = await getCidades();            

            cidades.forEach(cidade => {
                const option = document.createElement('option');
                option.value = cidade.id;
                option.textContent = cidade.nome + ' - ' + cidade.uf;
                select.appendChild(option);
            });
        } catch (error) {
            console.error("Erro ao carregar cidades:", error);
            alert("Erro ao carregar cidades.");
        }
    }
});

document.addEventListener("DOMContentLoaded", () => {
    if (formHome) {
        const btnSalvar = document.getElementById('btnSalvarCTO');

        btnSalvar.addEventListener("click", async () => {
            const tecnicoCodigo = document.getElementById("descricao_tecnico").value;
            const cidade = document.getElementById("nome_cidade").value;
            const data = document.getElementById("data").value;
            const dataFormatada = formatarDataParaTimestamp(data);

            // Validações
            if (!tecnicoCodigo || !cidade || !data) {
                alert("Preencha todos os campos antes de salvar.");
                return;
            }

            try {
                const resposta = await postCTO(tecnicoCodigo, cidade, dataFormatada);
                alert("CTO salvo com sucesso!");
                carregarUltimoCTO(); // Atualiza a exibição do último CTO
            } catch (error) {
                alert("Erro ao salvar CTO.");
            }
        });
    }
});

if (formHome)  {
    document.addEventListener("DOMContentLoaded", carregarUltimoCTO);
}

async function carregarUltimoCTO() {
    try {
        const ultimoCTO = await getUltimoCTO(); 
        let dataCTO;
        let cidadeFormatada;

        // Verifica se o objeto `ultimoCTO` tem conteúdo

        ultimoCTO.CTO_CODIGO = ultimoCTO.CTO_CODIGO || "Nenhum número armazenado ainda.";
        ultimoCTO.TEC_NOME = ultimoCTO.TEC_NOME || "Nenhuma descrição armazenada ainda.";

        if (ultimoCTO.CTO_DATA !== undefined) {
            // Formata a data recebida, se não for nula
            dataCTO = formatadaDataRecebida(ultimoCTO.CTO_DATA);
        }
        else {
            // Se a data for nula, atribui uma mensagem padrão
            dataCTO = "Nenhuma data armazenada ainda.";
        }

        ultimoCTO.CTO_DATA = dataCTO;

        if (ultimoCTO.CID_NOME !== undefined) {
            cidadeFormatada = ultimoCTO.CID_NOME + " - " + ultimoCTO.CID_UF;
        }
        else {
            cidadeFormatada = "Nenhuma cidade armazenada ainda.";
        }

        ultimoCTO.CID_NOME = cidadeFormatada;

        // Atualiza os elementos do HTML com os dados do último CTO
        document.getElementById('cto').innerHTML = "Número: " + ultimoCTO.CTO_CODIGO;
        document.getElementById('tecnico').innerHTML = "Feito por: " + ultimoCTO.TEC_NOME;
        document.getElementById('datacto').innerHTML = `Data: ${dataCTO}`;
        document.getElementById('cidade').innerHTML = "Cidade: " + ultimoCTO.CID_NOME;
    } 

    catch (error) {
        console.error('Erro ao carregar o último CTO:', error);
        alert('Erro ao carregar o último CTO.');

        // Exibe mensagens de erro no HTML
        document.getElementById('cto').innerHTML = `<span>Número:</span> Erro ao carregar`;
        document.getElementById('tecnico').innerHTML = `<span>Feito por:</span> Erro ao carregar`;
        document.getElementById('datacto').innerHTML = `<span>Data:</span> Erro ao carregar`;
        document.getElementById('cidade').innerHTML = `<span>Cidade:</span> Erro ao carregar`;
    }

}

document.addEventListener("DOMContentLoaded", () => {
    if (formCadastroTecnico) { 
        const btnSalvar = document.getElementById('btnSalvarTecnico');

        btnSalvar.addEventListener("click", async () => {
            const nomeTecnico = document.getElementById("nomeTecnico").value;
            const situacaoTecnico = document.getElementById("situacaoTecnico").value;

            // Validações
            if (!nomeTecnico || !situacaoTecnico) {
                alert("Preencha todos os campos antes de salvar.");
                return;
            }

            try {
                const resposta = await postTecnico(nomeTecnico, situacaoTecnico);
                console.log("Técnico salvo com sucesso:", resposta);
                alert("Técnico salvo com sucesso!");
            } catch (error) {
                console.error("Erro ao cadastrar técnico:", error);
                alert("Erro ao cadastrar técnico." + error);
            }
        });
}
});

document.addEventListener("DOMContentLoaded", async () => {
    if (formAlterarTecnico) {
        const selectTecnico = document.getElementById('descricao_tecnico');
        const selectSituacaoTecnico = document.getElementById('situacaoTecnico');

        try {
            // Carrega os técnicos e preenche a combo box
            const tecnicos = await getTodosTecnicos();

            tecnicos.forEach(tecnico => {
                const option = document.createElement('option');                
                option.value = tecnico.id;
                option.textContent = tecnico.nome;
                option.dataset.situacao = tecnico.situacao; // Armazena a situação no atributo 
                selectTecnico.appendChild(option);
            });


            // Adiciona o evento para preencher a situação ao selecionar um técnico
            selectTecnico.addEventListener('change', (event) => {
                const tecnicoSelecionado = event.target.selectedOptions[0]; // Obtém a opção selecionada
                const situacao = tecnicoSelecionado.dataset.situacao; // Obtém a situação do técnico
                if (situacao !== undefined) {
                    selectSituacaoTecnico.value = situacao; // Define a situação no campo
                } else {
                    selectSituacaoTecnico.value = ""; // Reseta o campo se nenhum técnico for selecionado
                }
            });
        } catch (error) {
            alert("Erro ao carregar técnicos.");
        }
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const formCadastroCidade = document.getElementById("formCadastroCidade");
    
    if (formCadastroCidade) {
        const cepInput = document.getElementById("cepCidade");

        // Formata o CEP enquanto o usuário digita
        cepInput.addEventListener("input", (event) => {
            let cep = event.target.value.replace(/\D/g, ""); // Remove não numéricos
            if (cep.length > 5) {
                cep = cep.slice(0, 5) + "-" + cep.slice(5, 8);
            }
            event.target.value = cep;
        });

        formCadastroCidade.addEventListener("submit", async (event) => {
            event.preventDefault();

            const nomeCidade = document.getElementById("nomeCidade").value;
            const cepCidade = document.getElementById("cepCidade").value.replace("-", "");
            const ufCidade = document.getElementById("ufCidade").value;

            if (!nomeCidade || !cepCidade || !ufCidade) {
                alert("Preencha todos os campos antes de salvar.");
                return;
            }

            // Aqui você pode mandar o fetch/post ou o que quiser
            console.log("Dados válidos:", { nomeCidade, cepCidade, ufCidade });
        });
    }
});


document.addEventListener("DOMContentLoaded", () => {
    if (formAlterarTecnico) { 
        const btnSalvar = document.getElementById('btnSalvarAlterarTecnico');

        btnSalvar.addEventListener("click", async () => {
            const tecnicoCodigo = document.getElementById("descricao_tecnico").value;
            const situacaoTecnico = document.getElementById("situacaoTecnico").value;           

            // Validações
            if (!tecnicoCodigo || !situacaoTecnico) {
                alert("Preencha todos os campos antes de salvar.");
                return;
            }

            try {
                const resposta = await putTecnicos(tecnicoCodigo, situacaoTecnico);
                console.log("Técnico atualizado com sucesso:", resposta);
                alert("Técnico salvo com sucesso!");
            } catch (error) {
                console.error("Erro ao atualizar técnico:", error);
                alert("Erro ao atualizar técnico." + error);
            }
        });
    }
});