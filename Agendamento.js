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
    
    //Verifica se esse horário está agendado para a data selecionada
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

