let date = new Date("Dec 24, 2024 23:59:59").getTime();

var update = setInterval(function() {
    var today = new Date().getTime();
    var difference = date - today;

    var days = Math.floor(difference / (1000*60*60*24));
    var hours = Math.floor((difference % (1000*60*60*24)) / (1000*60*60));
    var minutes = Math.floor((difference % (1000*60*60)) / (1000*60));
    var seconds = Math.floor((difference % (1000*60)) / 1000);
    
    //output
    document.getElementById("countdown").innerHTML = days + " dias " + hours + " horas " + minutes + " minutos " + seconds + " segundos";

    if(difference < 0) {
        clearInterval(update);
        document.getElementById("countdown").innerHTML = "¡Llegó Papá Noel!";
    }
}, 1000);
