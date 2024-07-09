function startTombola() {    

    const start = parseInt(document.getElementById('start').value);
    const end = parseInt(document.getElementById('end').value);
    // Reemplaza el alert en startTombola con showModal
    if (isNaN(start) || isNaN(end) || start >= end) {
        showModal("Por favor, ingrese un rango válido.");
        return;
    }

    if (winners.length >= (end - start + 1)) {
        showEndMessage();
        return;
    }
    // Obtén el elemento de audio
    var generaNumbersSound = document.getElementById("generaNumbersSound");
    generaNumbersSound.play();

    // Obtén el elemento de audio
    var tombolaSound = document.getElementById("tombolaSound");
    tombolaSound.play();

    const winnerElement = document.getElementById('winner');
    let intervalId;
    const duration = 2000; // Duración en milisegundos (2 segundos)
    const interval = 100; // Intervalo de actualización en milisegundos (0.1 segundo)

    const randomizeNumber = () => {
        const randomNumber = Math.floor(Math.random() * (end - start + 1)) + start;
        winnerElement.textContent = randomNumber;
        winnerElement.style.transform = 'scale(2.2)';
        setTimeout(() => {
            winnerElement.style.transform = 'scale(1.2)';
        }, 100);
    };

    intervalId = setInterval(randomizeNumber, interval);

    setTimeout(() => {
        clearInterval(intervalId);
        let finalWinner;
        do {
            finalWinner = Math.floor(Math.random() * (end - start + 1)) + start;
        } while (winners.includes(finalWinner));
        winners.push(finalWinner);
        winnerElement.textContent = finalWinner;
        winnerElement.style.transform = 'scale(2.5)';

        setTimeout(() => {
            winnerElement.style.transform = 'scale(1)';
        }, 300);
        updateWinnersList();
        highlightWinningNumbers(finalWinner);

        // Reproduce el sonido del número ganador
        var winnerSound = document.getElementById("winnerSound");
        winnerSound.src = "soundsNumbers/" + finalWinner + ".mp3";
        winnerSound.play();

        if (winners.length >= (end - start + 1)) {
            showEndMessage();
        }

        // Detén el sonido cuando el número se ha generado
        tombolaSound.pause();
        tombolaSound.currentTime = 0;

    }, duration);
}

function disableStartTombolaButton() {
    const startTombolaButton = document.querySelector('button[onclick="startTombola()"]');
    startTombolaButton.disabled = true;
    
}