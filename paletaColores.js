const storedColors = JSON.parse(localStorage.getItem('colores')) || ['#FA8072', '#00FF7F'];
        let colors = storedColors;

        function addColor() {
            const colorInput = document.getElementById('colorInput');
            const color = colorInput.value;
            if (!colors.includes(color)) {
                colors.push(color);
                updateColorPalette();
                saveColors();
            }
        }

        function removeColor(color) {
            colors = colors.filter(c => c !== color);
            updateColorPalette();
            saveColors();
        }

        function updateColorPalette() {
            const colorPalette = document.getElementById('colorPalette');
            colorPalette.innerHTML = ''; // Limpiar la paleta de colores
            colors.forEach(color => {
                const colorBox = document.createElement('div');
                colorBox.className = 'colorBox';
                colorBox.style.backgroundColor = color;
                colorBox.innerHTML = `<button class="removeColor" onclick="removeColor('${color}')">x</button>`;
                colorPalette.appendChild(colorBox);
            });
        }

        function saveColors() {
            localStorage.setItem('colores', JSON.stringify(colors));
        }

        function getPlayerColor(index) {
            return colors[index % colors.length]; // Devolver un color de la lista en función del índice
        }

        document.getElementById('openPaletteModal').onclick = function() {
            document.getElementById('modalPaleta').style.display = "block";
        }

        document.getElementById('closePaletteModal').onclick = function() {
            document.getElementById('modalPaleta').style.display = "none";
        }

        window.onclick = function(event) {
            if (event.target == document.getElementById('modalPaleta')) {
                document.getElementById('modalPaleta').style.display = "none";
            }
        }

        // Inicializar la paleta de colores
        updateColorPalette();