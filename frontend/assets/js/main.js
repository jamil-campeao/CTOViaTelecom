import { getTecnicos, getCidades, postCTO, getUltimoCTO, postTecnico } from './api.js';
import { formatarDataParaTimestamp, formatadaDataRecebida } from '../../utils/helpers.js';


document.addEventListener("DOMContentLoaded", async () => {
    if (window.location.pathname.endsWith("index.html") || window.location.pathname === "/") {
        const select = document.getElementById('descricao_tecnico');

        try {
            const tecnicos = await getTecnicos();            

            tecnicos.forEach(tecnico => {
                const option = document.createElement('option');
                option.value = tecnico.id;
                option.textContent = tecnico.nome;
                select.appendChild(option);
            });
        } catch (error) {
            console.error("Erro ao carregar técnicos:", error);
            alert("Erro ao carregar técnicos.");
        }
}
});

document.addEventListener("DOMContentLoaded", async () => {
    if (window.location.pathname.endsWith("index.html")) {
        const select = document.getElementById('nome_cidade');

        try {
            const cidades = await getCidades();

            cidades.forEach(cidade => {
                const option = document.createElement('option');
                option.value = cidade.id;
                option.textContent = cidade.nome;
                select.appendChild(option);
            });
        } catch (error) {
            console.error("Erro ao carregar cidades:", error);
            alert("Erro ao carregar cidades.");
        }
    }
});

document.addEventListener("DOMContentLoaded", () => {
    if (window.location.pathname.endsWith("index.html")) {
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
                console.log("CTO salvo com sucesso:", resposta);
                alert("CTO salvo com sucesso!");
            } catch (error) {
                console.error("Erro ao salvar CTO:", error);
                alert("Erro ao salvar CTO.");
            }
        });
}
});

if (window.location.pathname.endsWith("index.html")) {
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
    if (window.location.pathname.endsWith("tecnico.html")) {
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


//Função para salvar dados no  (Forma antiga)
function salvarDados() {
    const numero = document.getElementById('numero').value;
    const descricao = document.getElementById('descricao').value;
    const data = document.getElementById('data').value;
    const cidade = document.getElementById('cidade').value;

    if (numero && descricao && data && cidade) {
        localStorage.setItem('numero', numero);
        localStorage.setItem('descricao', descricao);
        localStorage.setItem('data', data);
        localStorage.setItem('cidade', cidade);

        carregarDados(); // Atualizar a exibição dos dados
        alert("Dados salvos com sucesso!");
    } else {
        alert("Por favor, preencha todos os campos.");
    }
}

// Função para carregar dados do localStorage (Forma antiga)
function carregarDados() {
    const numero = localStorage.getItem('numero');
    const descricao = localStorage.getItem('descricao');
    const data = localStorage.getItem('data');
    const cidade = localStorage.getItem('cidade');

    if (numero && descricao && data && cidade) {
        document.getElementById('numeroArmazenado').innerText = "Número: " + numero;
        document.getElementById('descricaoArmazenada').innerText = "Feito por: " + descricao;
        document.getElementById('dataArmazenada').innerText = "Data: " + data;
        document.getElementById('cidadeArmazenada').innerText = "Cidade: " + cidade;
    }
}


