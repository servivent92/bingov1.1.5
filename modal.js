const DEFAULT_PASSWORD = '1234';

document.addEventListener("DOMContentLoaded", () => {
    if (!localStorage.getItem('password')) {
        localStorage.setItem('password', DEFAULT_PASSWORD);
    }

    document.getElementById('password').addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            verificarContraseña();
        }
    });
});

function abrirHistorial() {
    document.getElementById('customHistorialModal').style.display = 'block';
    document.getElementById('password').value = '';
    document.getElementById('customHistorialContent').style.display = 'none';
    document.getElementById('password').focus(); // Establecer el foco en el campo de contraseña
}

function verificarContraseña() {
    const passwordInput = document.getElementById('password').value;
    const storedPassword = localStorage.getItem('password_admin');

    if (passwordInput === storedPassword) {
        document.getElementById('customHistorialContent').style.display = 'block';
        document.getElementById('customChangePasswordContent').style.display = 'block';
        document.querySelector('.custom-contenedor-contraseña').style.display = 'none';
        
    } else {
        alert('Contraseña incorrecta');
        document.getElementById('password').value = '';
    }
}

function closeHistorialModal() {
    document.getElementById('customHistorialModal').style.display = 'none';
    document.getElementById('password').value = '';
    document.getElementById('newPassword').value = '';
    document.getElementById('customHistorialContent').style.display = 'none';
    document.getElementById('customChangePasswordContent').style.display = 'none';
    document.querySelector('.custom-contenedor-contraseña').style.display = 'block';
}


function buscarEnHistorial() {
    const searchValue = document.getElementById('search').value.toLowerCase();
    const table = document.getElementById('gameHistoryTable');
    const rows = table.getElementsByTagName('tr');

    for (let i = 1; i < rows.length; i++) {
        const cells = rows[i].getElementsByTagName('td');
        let rowContainsSearchValue = false;

        for (let j = 0; j < cells.length; j++) {
            if (cells[j].innerText.toLowerCase().includes(searchValue)) {
                rowContainsSearchValue = true;
                break;
            }
        }

        rows[i].style.display = rowContainsSearchValue ? '' : 'none';
    }
}

function reiniciarHistorial() {
    const password = prompt('Ingrese la contraseña para reiniciar el historial:');
    const correctPassword = localStorage.getItem('password_admin');
    if (password === correctPassword) {
        localStorage.removeItem('gameHistory');
        updateGameHistoryTable();
        alert('Historial reiniciado');
    } else {
        alert('Contraseña incorrecta');
    }
}



function cambiarContraseña() {
    const newPassword = document.getElementById('newPassword').value;
    if (newPassword) {
        localStorage.setItem('password', newPassword);
        alert('Contraseña cambiada con éxito');
        document.getElementById('newPassword').value = '';
    } else {
        alert('Por favor, ingrese una nueva contraseña');
    }
}

function resetPassword() {
    if (confirm('¿Estás seguro de que quieres restablecer la contraseña a la predeterminada?')) {
        localStorage.setItem('password', DEFAULT_PASSWORD);
        alert('La contraseña ha sido restablecida a la predeterminada.');
    }
}


function closeModal() {
    document.getElementById('customModal').style.display = 'none';
}


