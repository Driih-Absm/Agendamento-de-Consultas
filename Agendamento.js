let horario = document.getElementById("horarioConsulta");
let inputData = document.getElementById("dataConsulta");

const consultasAgendadas = [
    new Date("2025-09-29T13:00:00"),
    new Date("2025-10-01T07:00:00"), 
    new Date("2025-10-02T10:00:00"), 
    new Date("2025-10-09T16:00:00") 
];

//Cria o horário dinamicamente
function gerarHorariosParaData(dataSelecionada){
    horario.innerHTML= ""; 

    for ( let hora = 7; hora <= 18; hora ++){

    //Converte as horas e os minutos para dois dígitos, por exemplo 07:00
    const horaFormatada = `${hora.toString().padStart(2,"0")}:00`;

    //Cria as opções de horarios no html
    const option = document.createElement("option");
    option.value = horaFormatada;
    option.innerHTML = horaFormatada;
    
    //Verifica se esse horário já está agendado para a data selecionada
    const dataHora = new Date(`${dataSelecionada}T${horaFormatada}:00`);
    const ocupado = consultasAgendadas.some(
        consulta => consulta.toISOString() === dataHora.toISOString());

        //Se já houver um horário a opção dele é desabilitada.
    if (ocupado){
    option.disabled = true;
    }

    horario.appendChild(option);

    }
}
//Gera o horário toda vez que a data muda.
inputData.addEventListener("change", () =>{
    const dataSelecionada = inputData.value;
    if (dataSelecionada){
        gerarHorariosParaData(dataSelecionada);
    }
})

//Adiciona um evento para pegar os valores de data e horario quando o botão for clicado
document.getElementById("enviar").addEventListener("click", () => {
    const dataSelecionada = inputData.value;
    const horarioSelecionado = horario.value;

    //Junta o horário e a data 
    if(dataSelecionada && horarioSelecionado){
        const dataHoraCompleta = `${dataSelecionada}T${horarioSelecionado}:00`;
        const novaConsulta = new Date (dataHoraCompleta);

        //Verifica se já tem algo agendado
        const consultaExiste = consultasAgendadas.some(
        consulta => consulta.toISOString() === horarioSelecionado.toISOString());

        //Se tiver avisa que precisa escolher outro horario
        if (consultaExiste){
            alert("Já existe uma consulta neste horário!!");
            //Senão adiciona no array e atualiza a lista
        } else {
            consultasAgendadas.push(novaConsulta);
            alert(`A consulta foi agendada para: ${novaConsulta.toLocaleString()}`);
            console.log("Consulta agendada");
            gerarHorariosParaData(dataSelecionada);
        }
    }
})

//Pega os dados do formulário
function exibirDados(){

    const nome = document.getElementById("nome").value;
    const cpf = document.getElementById("cpf").value;
    const dataNascimento = document.getElementById("dataNascimento").value.toLocaleString("pt-BR");
    const celular = document.getElementById("celular").value;
    const convenio = document.getElementById("convenio").value;
    const medico = document.getElementById("medico").value;
    const diaConsulta = document.getElementById("dataConsulta").value.toLocaleString("pt-BR");
    const horaConsulta = document.getElementById("horarioConsulta").value;

    //Organiza em como vai exibir
    const validacao = {
        Nome: nome,
        CPF: cpf,
        DataNascimento: dataNascimento,
        Celular: celular,
        Convênio: convenio,
        Médico: medico,
        Consulta: diaConsulta,
        Horário: horaConsulta
    };

    //Limpa os dados anteriores se houver
    const resumo = document.getElementById("resumo");
    resumo.innerHTML="";

    //Cria uma lista com os dados
    const validaDados = document.createElement("ul");
    for(const label in validacao) {
        const listaDados = document.createElement("li");
        listaDados.textContent = `${label}: ${validacao[label]}`;
        validaDados.appendChild(listaDados);
    }
    //Traz o resumo
    resumo.appendChild(validaDados);
}

