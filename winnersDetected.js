var winner1 = document.getElementById("winner1");
var winner2 = document.getElementById("winner2");
var fin1 = document.getElementById("fin1");
var fin2 = document.getElementById("fin2");
let winnersDetected = 0;
const winnerNames = new Set();

let prizeCount = 0;

//Este código agrega un evento de escucha al campo de entrada que detecta cuándo se presiona la tecla Enter 
//(event.key === 'Enter'). Si se presiona Enter, llama a la función addPrize()
document.getElementById('prize-amount').addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        addPrize();
    }
});


function addPrize() {
    const prizeAmountInput = document.getElementById('prize-amount');
    const prizeAmount = prizeAmountInput.value;

    if (prizeAmount.trim() === '' || isNaN(prizeAmount) || prizeAmount <= 0) {
        alert('Por favor, ingrese un monto válido para el premio.');
        return;
    }

    prizeCount++;

    const prizeTable = document.getElementById('prizeTable').getElementsByTagName('tbody')[0];
    const newRow = prizeTable.insertRow();

    const positionCell = newRow.insertCell(0);
    const prizeCell = newRow.insertCell(1);
    const winnersCell = newRow.insertCell(2);

    positionCell.textContent = `${prizeCount}° Premio`;
    prizeCell.textContent = `Bs.${prizeAmount}`;
    winnersCell.textContent = '';

    prizeAmountInput.value = '';

}

function deletePrize() {
    const prizeTableBody = document.getElementById('prizeTable').getElementsByTagName('tbody')[0];
    prizeTableBody.innerHTML = '';
    prizeCount = 0;
}

function checkForWinner() {
    const rows = playerTable.rows;
    for (let i = 0; i < rows.length; i++) {
        let complete = true;

        for (let j = 2; j <= 6; j++) {
            if (!rows[i].cells[j].classList.contains('highlight')) {
                complete = false;
                break;
            }
        }
        if (complete) {
            const playerName = rows[i].cells[1].querySelector('.editable').value;
            if (playerName && !winnerNames.has(playerName)) {
                winnersDetected++;
                winnerNames.add(playerName);

                // Cambiar la imagen GIF por otra imagen
                const gif = rows[i].cells[1].querySelector('.player-gif');
                gif.src = "gif/emoji_ganador.gif"; // Reemplaza con la ruta de tu nueva imagen

                const playerColor = rows[i].cells[0].style.backgroundColor;
                // Pintar la celda donde está el input del jugador
                //const playerNameCell = rows[i].cells[1];

                // Aplica el color del jugador como una variable CSS
                //playerNameCell.style.setProperty('--flash-color', playerColor);


                // Añadir animación de destello
                //playerNameCell.classList.add('flashG');

                // Esperar a que termine la animación antes de cambiar el color de fondo
                //setTimeout(() => {
                //playerNameCell.style.backgroundColor = playerColor;

                // Pintar todas las celdas de la fila ganadora
                for (let k = 1; k <= 6; k++) {
                    // Aplica el color del jugador como una variable CSS
                    rows[i].cells[k].style.setProperty('--flash-color', playerColor);
                    rows[i].cells[k].classList.add('flashG');
                }
                //}, 500); // Duración de la animación en milisegundos

                // Mostrar el mensaje de ganador y agregar a la tabla de premios
                document.getElementById('win-message').textContent = `¡Felicidades, ${playerName}! Has ganado.`;
                addWinnerToPrizeTable(playerName);
                startConfetti();

                // Obtén el elemento de audio del ganador
                document.getElementById('winnerNumbers').textContent = `Ganadores: ${winnersDetected}`;
                console.log("Premios " + prizeCount + " Ganadores: " + winnersDetected);

                winner1.play();
                winner2.play();
                //detecta el ultimo ganador
                if (winnersDetected >= prizeCount) {
                    document.getElementById('winnerNumbers').textContent = `Ganadores: ${winnersDetected}`;

                    console.log("Premios " + prizeCount + " Ganadores: " + winnersDetected);
                    disableStartTombolaButton();
                    addGameToHistory(playerName, playerName, playerName);

                    /*winner2.onended = () => {
                        fin1.play();
                        fin2.play();                
                    };*/
                    
                }
                break;

            }
        }
    }
}


function addWinnerToPrizeTable(playerName) {
    const prizeTable = document.getElementById('prizeTable').getElementsByTagName('tbody')[0];
    for (let i = 0; i < prizeTable.rows.length; i++) {
        const row = prizeTable.rows[i];
        const winnersCell = row.cells[2];
        if (winnersCell.textContent === '') {
            winnersCell.textContent = playerName;
            break;
        }
    }
}