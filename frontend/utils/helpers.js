function formatadaDataRecebida(dataRecebida) {
    try {
        // Adiciona o sufixo 'Z' se não estiver presente
        const dataISO = dataRecebida.endsWith('Z') ? dataRecebida : `${dataRecebida}Z`;

        const data = new Date(dataISO);    
    
        if (isNaN(data.getTime())) {
            console.error("Data inválida:", dataRecebida);
            return "Data inválida";
        }
    
        const opcoes = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return data.toLocaleDateString('pt-BR', opcoes); 
    } catch (error) {
        console.error("Erro ao formatar data:", error);
        return "Erro ao formatar data";
        
    }

}


function formatarDataParaTimestamp(dataInput) {
    const data = new Date(dataInput);

    const ano = data.getFullYear();
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const dia = String(data.getDate()).padStart(2, '0');
    const horas = String(data.getHours()).padStart(2, '0');
    const minutos = String(data.getMinutes()).padStart(2, '0');
    const segundos = String(data.getSeconds()).padStart(2, '0');

    return `${ano}-${mes}-${dia} ${horas}:${minutos}:${segundos}`;
}

export { formatarDataParaTimestamp, formatadaDataRecebida };