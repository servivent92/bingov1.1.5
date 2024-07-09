generateNumbersBtn.addEventListener('click', () => {
    const rows = playerTable.rows;
    const playerCount = rows.length;
    const numbersNeeded = playerCount * 5;
    const generatedNumbers = new Set();
   
    document.getElementById('winnerNumbers').textContent = `Ganadores: ${prizeCount}`;
    console.log("total ganadores " + prizeCount);
    // Llama a la nueva función para limpiar los números de los jugadores
    clearPlayerNumbers();

    clearColumnWinner('prizeTable');

    winnersDetected=0;
    console.log("total ganadores quedo en " + winnersDetected);
    document.getElementById('winnerNumbers').textContent = `Ganadores: ${winnersDetected}`;

    while (generatedNumbers.size < numbersNeeded) {
        const randomNumber = Math.floor(Math.random() * numbersNeeded) + 1;
        generatedNumbers.add(randomNumber);
    }

    const numbersArray = Array.from(generatedNumbers);
    let numberIndex = 0;

    const animateNumber = (number, row, cell) => {
        const animationContainer = document.getElementById('number-animation-container');
        animationContainer.textContent = number;
        animationContainer.style.display = 'block';

        const cellRect = cell.getBoundingClientRect();
        const animationContainerRect = animationContainer.getBoundingClientRect();

        const deltaX = cellRect.left + (cellRect.width / 2) - (animationContainerRect.left + (animationContainerRect.width / 2));
        const deltaY = cellRect.top + (cellRect.height / 2) - (animationContainerRect.top + (animationContainerRect.height / 2));

        animationContainer.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
        animationContainer.classList.add('number-animation');

        setTimeout(() => {
            cell.textContent = number;
            animationContainer.style.display = 'none';
            animationContainer.classList.remove('number-animation');
            animationContainer.style.transform = 'translate(-50%, -50%)'; // Resetear la posición

            if (numberIndex < numbersArray.length) {
                animateNumber(numbersArray[numberIndex], rows[Math.floor(numberIndex / 5)], rows[Math.floor(numberIndex / 5)].cells[(numberIndex % 5) + 2]);
                numberIndex++;

                // Obtén el elemento de audio
                var generaNumbersSound = document.getElementById("generaNumbersSound");
                generaNumbersSound.play();

            } else {
                // Mostrar cantidad total de números generados
                const totalNumbers = numbersArray.length;
                document.getElementById('total-numbers').textContent = `Total Números: ${totalNumbers}`;
                console.log(totalNumbers);
                document.getElementById('start').value = 1;
                document.getElementById('end').value = totalNumbers;
            }

            
        }, 350); // Ajustar la duración de la espera para cada animación

        const playersInput = document.getElementById('numPlayers');
        playersInput.value = '';

        
    };

    if (numberIndex < numbersArray.length) {
        animateNumber(numbersArray[numberIndex], rows[Math.floor(numberIndex / 5)], rows[Math.floor(numberIndex / 5)].cells[(numberIndex % 5) + 2]);
        numberIndex++;
    }

    // Mostrar cantidad de jugadores
    const playersCount = playerTable.rows.length;
    document.getElementById('players-count').textContent = `Jugadores: ${playersCount}`;
    
    //Reinica la tombola
    winners = [];
    winnerNames.clear();
    winnersDetected = 0;
    document.getElementById('winner').textContent = '?';
    document.getElementById('winners-list').innerHTML = '';
    document.getElementById('end-message').style.display = 'none';
    const startTombolaButton = document.querySelector('button[onclick="startTombola()"]');
    startTombolaButton.disabled = false;

    clearPlayerName()
    clearPlayerNumbers()
    
});

