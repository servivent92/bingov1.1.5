let winners = [];

function showModal(message) {
    const modal = document.getElementById('modal');
    const modalMessage = document.getElementById('modal-message');
    modalMessage.textContent = message;
    modal.style.display = 'flex';
}

function closeModal() {
    document.getElementById('modal').style.display = 'none';
}

function showEndMessage() {
    showModal('No queda más números, el juego ha terminado, ¡click en Reiniciar Juego!');
}

function updateWinnersList() {
    const winnersList = document.getElementById('winners-list');
    winnersList.innerHTML = '';

    const sortedWinners = winners.slice().reverse(); // Copia invertida de los ganadores

    sortedWinners.forEach((winner, index) => {
        const winnerDiv = document.createElement('div');
        winnerDiv.className = 'winner-number';
        winnerDiv.textContent = winner;
        winnersList.appendChild(winnerDiv);
    });

    const allWinnerNumbers = winnersList.querySelectorAll('.winner-number');
    if (allWinnerNumbers.length > 0) {
        // Remover estilos del último ganador anterior si existe
        const previousLastWinner = winnersList.querySelector('.winner-number.last-winner');
        if (previousLastWinner) {
            previousLastWinner.classList.remove('numberWin');
            previousLastWinner.classList.remove('last-winner');
        }

        // Agregar estilos al nuevo último ganador
        const lastWinner = allWinnerNumbers[0];
        lastWinner.classList.add('numberWin');
        lastWinner.classList.add('last-winner');
    }

}



function showEndMessage() {
    const endMessage = document.getElementById('end-message');
    endMessage.style.display = 'block';
}
// dede aque
const addPlayerBtn = document.getElementById('addPlayerBtn');
const generateNumbersBtn = document.getElementById('generateNumbersBtn');
const playerTable = document.getElementById('playerTable').querySelector('tbody');


//---------------------------------------------------------------------
document.getElementById('numPlayers').addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        addPlayerBtn.click();
    }
});

addPlayerBtn.addEventListener('click', () => {

    const numPlayers = parseInt(document.getElementById('numPlayers').value);
    if (isNaN(numPlayers) || numPlayers <= 0) {
        alert('Ingrese un número válido de jugadores.');
        return;
    }

    const currentRowCount = playerTable.rows.length;

    for (let i = 0; i < numPlayers; i++) {
        const newRow = playerTable.insertRow(currentRowCount + i);

        for (let j = 0; j <= 7; j++) {
            const newCell = newRow.insertCell(j);
            if (j === 0) {
                newCell.textContent = currentRowCount + i + 1;
                newCell.style.backgroundColor = getPlayerColor(currentRowCount + i); // Aplicar el color de fondo a la celda
            } else if (j === 1) {
                newCell.innerHTML = `
                <div class="player-name-container">
                    <img src="gif/emoji.gif" class="player-gif" style="display:none; width:30px; height:30px; margin-left:10px;">
                    <input class="editable" type="text" placeholder="Jugador" tabindex="3">
                </div>
            `;
                // Añadir evento input para convertir a mayúsculas y mostrar la imagen
                const input = newCell.querySelector('.editable');
                const img = newCell.querySelector('.player-gif');
                input.addEventListener('input', function () {
                    this.value = this.value.toUpperCase();
                    img.style.display = this.value ? 'inline' : 'none';
                });

            } else if (j === 7) {
                newCell.innerHTML = `<button class="button-action red-btn" onclick="deleteRow(this)"><i class="material-icons">remove</i></button>`;
            } else {
                newCell.textContent = '';
            }
        }
    }



    // Mostrar cantidad de jugadores
    const playersCount = playerTable.rows.length;
    document.getElementById('players-count').textContent = `Jugadores: ${playersCount}`;
});

function deletePlayer() {
    const playersInput = document.getElementById('numPlayers');
    playersInput.value = '';
    const playerTableBody = document.getElementById('playerTable').getElementsByTagName('tbody')[0];
    playerTableBody.innerHTML = '';
    // Mostrar cantidad de jugadores
    const playersCount = playerTable.rows.length;
    document.getElementById('players-count').textContent = `Jugadores: ${playersCount}`;
}


function getPlayerColor(index) {
    const colors = [
        '#FA8072', '#00FF7F'

        // '#00FF00', '#FA8072', '#00FF7F', '#FFA07A', '#20B2AA',
        // '#FFA500', '#7FFFD4', '#F3F309', '#87CEEB', '#6060FF',
        // '#00BFFF', '#F4A460', '#FF60F3', '#D3D3D3', '#00FF00',
        // '#778899', '#00FFFF', '#6495ED', '#E6E6FA', '#BDB76B',
        // '#ADFF2F', '#FFE4B5', '#FFE4C4', '#00FA9A', '#FFC0CB'
    ];
    return colors[index % colors.length]; // Devolver un color de la lista en función del índice
}

//---------------------------------------------------------------------

function deleteRow(button) {
    const row = button.closest('tr');
    row.parentNode.removeChild(row);

    const rows = playerTable.rows;
    for (let i = 0; i < rows.length; i++) {
        rows[i].cells[0].textContent = i + 1;
        // Mostrar cantidad de jugadores
        const playersCount = playerTable.rows.length;
        document.getElementById('players-count').textContent = `Jugadores: ${playersCount}`;
    }

}



function clearColumnWinner(prizeTable) {
    
    console.log("se ha ejecutado clearColumnWinner");
    // Obtener la tabla por su ID
    const table = document.getElementById(prizeTable);

    // Recorrer todas las filas de la tabla
    const rows = table.rows;
    for (let i = 1; i < rows.length; i++) { // Comenzar desde 1 para evitar la fila de encabezado
        if (rows[i].cells.length > 1) { // Verificar que haya al menos 2 columnas
            rows[i].cells[2].innerHTML = '';
            console.log(`Celda vaciada en fila ${i}, columna 2`);
        }
    }
}



// Actualizar la función highlightWinningNumbers para llamar a checkForWinner
function highlightWinningNumbers(winningNumber) {
    const rows = playerTable.rows;
    for (let i = 0; i < rows.length; i++) {
        for (let j = 2; j <= 6; j++) {
            if (parseInt(rows[i].cells[j].textContent) === winningNumber) {
                const playerColor = rows[i].cells[0].style.backgroundColor;
                //agrega la animacion flash
                rows[i].cells[j].classList.add('flash');
                rows[i].cells[j].style.backgroundColor = playerColor;
                //aplica el color de la celda 0
                rows[i].cells[j].classList.add('highlight');
            }
        }
    }
    checkForWinner();
}

function resetGame() {
    mostrarLoadingScreen()
    winners = [];
    winnerNames.clear();
    winnersDetected = 0;
    document.getElementById('winner').textContent = '?';
    document.getElementById('winners-list').innerHTML = '';
    document.getElementById('start').value = '';
    document.getElementById('end').value = '';
    document.getElementById('end-message').style.display = 'none';
    const startTombolaButton = document.querySelector('button[onclick="startTombola()"]');
    startTombolaButton.disabled = false;

    // Remover el resaltado de los números ganadores en la tabla
    const highlightedCells = document.querySelectorAll('.highlight');
    highlightedCells.forEach(cell => {
        cell.classList.remove('highlight');
        cell.style.backgroundColor = ''; // Eliminar el color de fondo
    });

    // Remover el resaltado de las celdas basadas en el color del jugador
    const rows = playerTable.rows;
    for (let i = 0; i < rows.length; i++) {
        for (let j = 1; j <= 6; j++) {
            rows[i].cells[j].classList.remove('highlight');
            rows[i].cells[j].style.backgroundColor = '';
        }
    }

    // Llama a la nueva función para limpiar los números de los jugadores
    clearPlayerNumbers();
    //Remueve las filas en la tabla de ganadores
    deletePrize();
    deletePlayer();

    const playersInput = document.getElementById('numPlayers');
    playersInput.value = '';
}

function clearPlayerNumbers() {
    const rows = playerTable.rows;
    for (let i = 0; i < rows.length; i++) {
        for (let j = 2; j <= 6; j++) {
            rows[i].cells[j].textContent = '';
            rows[i].cells[j].classList.remove('highlight');
            rows[i].cells[j].style.backgroundColor = '';
            rows[i].cells[j].classList.remove('flash');
            rows[i].cells[j].classList.remove('flashG');
        }
        rows[i].cells[1].classList.remove('flashG');
    }

    // Actualizar la cantidad total de números generados
    document.getElementById('total-numbers').textContent = 'Total Números: 0';
}

function clearPlayerName() {
    const rows = playerTable.rows;
    for (let i = 0; i < rows.length; i++) {
        for (let j = 1; j <= 1; j++) {
            // Cambiar la imagen GIF por otra imagen
            const gif = rows[i].cells[1].querySelector('.player-gif');
            gif.src = "gif/emoji.gif"; // Reemplaza con la ruta de tu nueva imagen
            rows[i].cells[j].style.backgroundColor = '';
        }
    }
}

document.querySelectorAll('.editable').forEach(input => {
    input.addEventListener('keydown', function (event) {
        if (event.keyCode === 13) { // Verifica si se presionó la tecla Enter
            event.preventDefault(); // Evita el comportamiento predeterminado de Enter (submit de formulario)

            // Encuentra el índice de la columna actual
            const columnIndex = Array.from(this.parentNode.cells).indexOf(this.parentNode.querySelector('input'));

            // Encuentra el índice de la fila actual
            const rowIndex = this.parentNode.parentNode.rowIndex;

            // Encuentra el próximo input editable en la siguiente fila
            const nextRow = this.parentNode.parentNode.nextSibling;
            if (nextRow) {
                const nextInput = nextRow.cells[columnIndex].querySelector('input.editable');
                if (nextInput) {
                    nextInput.focus(); // Enfoca el próximo input editable
                }
            }
        }
    });
});

// Esperar a que la página cargue completamente
window.onload = function () {

    // Ocultar el loading-screen después de 3 segundos
    setTimeout(function () {
        document.getElementById('loading-screen').style.display = 'none';
    }, 3000); // 3000 milisegundos = 3 segundos

    updateGameHistoryTable();

    sortTableByDate()
    sortAndGroupTableByDate()

    const user = localStorage.getItem('usuario');
    if (!user) {
        alert('Por favor, inicia sesión primero.');
        window.location.href = 'index.html';
    } else {
        const welcomeMessage = document.getElementById('welcomeMessage');
        welcomeMessage.textContent = `Bienvenido, ${user.charAt(0).toUpperCase() + user.slice(1)}!`;

        const changePasswordBtn = document.getElementById('changePasswordBtn');
        if (user !== 'administrador') {
            changePasswordBtn.style.display = 'none';
        }

        const abrirHistorial = document.getElementById('abrirHistorial');
        if (user !== 'administrador') {
            abrirHistorial.style.display = 'none';
        }
    }

};

function logout() {
    localStorage.removeItem('usuario');
    window.location.href = 'index.html';
}

function openModal() {
    document.getElementById('passwordModal').style.display = 'block';
}

function closeModalPassword() {
    document.getElementById('passwordModal').style.display = 'none';
}

function changePassword() {
    const userSelect = document.getElementById('userSelect').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (newPassword === confirmPassword) {
        if (userSelect === 'administrador') {
            localStorage.setItem('password_admin', newPassword);
        } else if (userSelect === 'usuario') {
            localStorage.setItem('password_user', newPassword);
        }
        alert('Contraseña cambiada con éxito');
        closeModal();
    } else {
        alert('Las contraseñas no coinciden');
    }
}



function makeDraggable(element) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById(element.id + "header")) {
        document.getElementById(element.id + "header").onmousedown = dragMouseDown;
    } else {
        element.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        element.style.top = (element.offsetTop - pos2) + "px";
        element.style.left = (element.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

function mostrarLoadingScreen() {
    // Mostrar el loading-screen
    document.getElementById('loading-screen').style.display = 'flex'; // Mostrar el contenedor
    setTimeout(function () {
        document.getElementById('loading-screen').style.display = 'none'; // Ocultar después de 3 segundos
    }, 2000); // 3000 milisegundos = 2 segundos
}

