let horario = document.getElementById("horarioConsulta");

let horariosAgendados = ["7", "10", "13", "16"];

//Cria o horário dinamicamente
for ( let hora = 7; hora <= 18; hora ++){

    //Converte as horas e os minutos para dois dígitos, por exemplo 07:00
    const horaFormatada = `${hora.toString().padStart(2,"0")}:00`;

    //Cria as opções de horarios no html
    const option = document.createElement("option");
    option.value = horaFormatada;
    option.innerHTML = horaFormatada;
    horario.appendChild(option);
}
