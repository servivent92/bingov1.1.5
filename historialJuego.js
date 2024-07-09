// Función para agregar un juego al historial
function addGameToHistory(players) {
    let gameHistory = JSON.parse(localStorage.getItem('gameHistory')) || [];
    const gameNumber = gameHistory.length + 1;
    const currentDate = new Date().toLocaleString();

    // Obtener ganadores y premios de la tabla prizeTable
    const prizeTable = document.getElementById('prizeTable');
    // Mostrar cantidad de jugadores
    const playersCount = playerTable.rows.length;
    const winners = [];
    const prizes = [];

    for (let i = 1; i < prizeTable.rows.length; i++) {
        const row = prizeTable.rows[i];
        const winner = row.cells[2].textContent; // Suponiendo que la tercera columna tiene los nombres de los ganadores
        const prize = row.cells[1].textContent;  // Suponiendo que la segunda columna tiene los premios
        if (winner && prize) {
            winners.push(winner);
            prizes.push(prize);
        }
    }

    const gameRecord = {
        gameNumber: gameNumber,
        players: playersCount, // Asumiendo que `players` es un array de nombres de jugadores
        winners: winners.join(', '),
        prizes: prizes.join(', '),
        date: currentDate
    };

    gameHistory.push(gameRecord);
    localStorage.setItem('gameHistory', JSON.stringify(gameHistory));

    updateGameHistoryTable();
    sortTableByDate()
    sortAndGroupTableByDate()

    
}

// Función para actualizar la tabla de historial de juegos
function updateGameHistoryTable() {
    const gameHistory = JSON.parse(localStorage.getItem('gameHistory')) || [];
    const gameHistoryTableBody = document.getElementById('gameHistoryTable').querySelector('tbody');
    gameHistoryTableBody.innerHTML = '';

    gameHistory.forEach(record => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${record.gameNumber}</td>
            <td>${record.players}</td>
            <td>${record.winners}</td>
            <td>${record.prizes}</td>
            <td>${record.date}</td>
        `;
        gameHistoryTableBody.appendChild(row);
    });
}

// Llamar a updateGameHistoryTable() al cargar la página para mostrar el historial
//window.onload = updateGameHistoryTable;

// Función para reiniciar el historial de juegos
function resetGameHistory() {
    localStorage.removeItem('gameHistory');
    updateGameHistoryTable();
}

// Ejemplo de función que maneja la lógica de detección de ganadores
function handleWinner(players) {
    // Lógica existente para manejar el ganador
    // ...

    // Agregar el ganador al historial
    addGameToHistory(players);
}

function sortTableByDate() {
    const table = document.getElementById('gameHistoryTable');
    const tbody = table.getElementsByTagName('tbody')[0];
    const rows = Array.from(tbody.getElementsByTagName('tr'));

    rows.sort((a, b) => {
        const dateA = new Date(a.cells[4].innerText); // Asumiendo que la columna de fecha es la quinta
        const dateB = new Date(b.cells[4].innerText);
        return dateB - dateA; // Para ordenar de más reciente a más antiguo
    });

    // Vuelve a añadir las filas ordenadas al tbody
    rows.forEach(row => tbody.appendChild(row));
}

document.addEventListener('DOMContentLoaded', sortTableByDate);

function sortAndGroupTableByDate() {
    const table = document.getElementById('gameHistoryTable');
    const tbody = table.getElementsByTagName('tbody')[0];
    const rows = Array.from(tbody.getElementsByTagName('tr'));

    // Objeto para almacenar las filas agrupadas por fecha
    const groupedRows = {};

    // Agrupar las filas por fecha (sin la hora)
    rows.forEach(row => {
        const fullDate = row.cells[4].innerText; // Asumiendo que la columna de fecha es la quinta
        const date = fullDate.split(' ')[0]; // Extraer solo la parte de la fecha (sin la hora)
        
        if (!groupedRows[date]) {
            groupedRows[date] = [];
        }
        groupedRows[date].push(row);
    });

    // Ordenar las fechas de forma descendente
    const sortedDates = Object.keys(groupedRows).sort((a, b) => new Date(b) - new Date(a));

    // Vaciar el tbody y añadir las filas agrupadas y ordenadas con títulos
    tbody.innerHTML = '';
    sortedDates.forEach(date => {
        const group = groupedRows[date];
        const titleRow = document.createElement('tr');
        const titleCell = document.createElement('td');
        titleCell.colSpan = 5;
        titleCell.innerText = `${date} (Registros: ${group.length})`;
        titleCell.style.fontWeight = 'bold';
        titleCell.style.backgroundColor = '#f2f2f2';
        titleRow.appendChild(titleCell);
        tbody.appendChild(titleRow);

        group.forEach(row => {
            tbody.appendChild(row);
        });
    });
}

// Llama a la función cuando necesites ordenar la tabla, por ejemplo, al cargar la página o después de añadir un nuevo registro
document.addEventListener('DOMContentLoaded', sortAndGroupTableByDate);
