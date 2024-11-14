// Variables
const tiempoRestante = document.getElementById('tiempo_restante');
const colors = [
    "#39FF14", // Neon Green
    "#FF6EC7", // Hot Pink
    "#01F9C6", // Turquoise
    "#F4F92A", // Lemon Yellow
];
let tiempo = 60;
let juegoActivo = false; // Estado del juego
let contadorInterval; // Variable para almacenar el intervalo del cronómetro
let movimientos = 0;

// Función para generar un número aleatorio entre min y max
function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Evento DOMContentLoaded para inicializar el juego y los eventos
document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.querySelector('#iniciar');
    if (startButton) {
        startButton.addEventListener('click', startGame);
    }

    // Asigna el evento de clic a cada tarjeta para verificar si es el Grinch
    const cards = document.querySelectorAll('.card');
    cards.forEach((card) => {
        card.addEventListener('click', () => checkGrinch(card.id));
    });

    // Agregar el evento para el botón de información
    const infoButton = document.querySelector('.info');  // Selecciona el botón con clase 'info'
    if (infoButton) {
        infoButton.addEventListener('click', infoJuego);
    }
});

// Función para verificar si se encontró al Grinch
function checkGrinch(num) {
    console.log("Carta seleccionada:", num);
    const grinchPosition = sessionStorage.getItem('grinchPosition');

    if (num === grinchPosition) {
        Swal.fire({
            icon: 'success',
            title: '¡Encontraste al Grinch!',
            text: '¡Felicidades!'
        });
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Oh no...',
            text: '¡Sigue buscando!'
        });
        movimientos++;
        const grinchElement = document.getElementById(grinchPosition);

        // Verificar si el elemento existe antes de obtener su estilo
        if (grinchElement) {
            const color = window.getComputedStyle(grinchElement).backgroundColor;
            rastro(color);
        } else {
            console.error("El elemento con ID 'card" + grinchPosition + "' no se encontró en el DOM.");
        }

        document.getElementById('contador_movimientos').innerText = movimientos;
        moveGrinch();
    }
}

// Función para iniciar el juego
function startGame() {
    const startButton = document.querySelector('#iniciar');
    startButton.disabled = true;
    startButton.classList.add('bg-gray-400', 'opacity-50');
    startButton.classList.remove('bg-green-500', 'hover:bg-green-600');

    // Genera una posición aleatoria para el Grinch
    let grinchPosition_X = random(0, 3);
    let grinchPosition_Y = random(0, 3);

    // Convierte la posición del Grinch a una cadena para asignarla como id
    let grinchPosition = `${grinchPosition_X}${grinchPosition_Y}`;

    // Asigna colores aleatorios a cada tarjeta y las habilita
    const cards = document.querySelectorAll('.card');
    cards.forEach((card) => {
        const color = colors[random(0, colors.length - 1)];
        card.style.backgroundColor = color;
        card.disabled = false;  // Habilita el botón para permitir clics
    });
    cronometro();

    // Guarda la posición del Grinch en sessionStorage para que se pueda acceder desde `checkGrinch`
    sessionStorage.setItem('grinchPosition', grinchPosition);
    console.log("Grinch está en la posición:", grinchPosition);
}

// Función para mover al Grinch
function moveGrinch() {
    const size = 4;
    let currentPosition = sessionStorage.getItem('grinchPosition');
    let x = parseInt(currentPosition.charAt(0));
    let y = parseInt(currentPosition.charAt(1));

    let newX, newY, ok = true;

    do {
        let dx = random(-1, 1);
        let dy = random(-1, 1);

        // Evitar que se quede en el mismo lugar o que se mueva en diagonal
        if (dx === 0 && dy === 0 || dx !== 0 && dy !== 0) continue;

        newX = x + dx;
        newY = y + dy;

        // Verificar que la nueva posición esté dentro de los límites del tablero
        if (newX >= 0 && newX < size && newY >= 0 && newY < size) {
            ok = false;
        }
    } while (ok);

    // Actualizar la nueva posición en sessionStorage
    sessionStorage.setItem('grinchPosition', `${newX}${newY}`);
}

// Función para reiniciar el juego
function reiniciarJuego() {
    const startButton = document.querySelector('#iniciar');
    startButton.disabled = false;
    startButton.classList.remove('bg-gray-400', 'opacity-50');
    startButton.classList.add('bg-green-500', 'hover:bg-green-600');

    const cards = document.querySelectorAll('.card');
    cards.forEach((card) => {
        card.style.backgroundColor = 'bg-blue-200';
        card.disabled = true;
    });

    sessionStorage.removeItem('grinchPosition');
    console.log("Juego reiniciado.");
}

// Función para el cronómetro
function cronometro() {
    contadorInterval = setInterval(() => {
        tiempo--;
        tiempoRestante.innerHTML = tiempo;
        if (tiempo <= 0) {
            clearInterval(contadorInterval);
            Swal.fire({
                title: '¡Se acabó el tiempo! 😱',
                text: '¡Ups! El tiempo ha volado. ¡Intenta de nuevo!',
                icon: 'error',
                confirmButtonText: '¡OK!',
                confirmButtonColor: '#4CAF50',
            }).then(() => {
                reiniciarJuego();
            });
        }
    }, 1000);
}

// Función para mostrar el rastro de los colores
function rastro(color) {
    const rastroAside = document.getElementById('rastro');
    rastroAside.innerHTML += `<div class="w-8 h-8 rounded-full" style="background-color: ${color};"></div>`;
}

// Función para mostrar las instrucciones del juego
function infoJuego() {
    // Detener el cronómetro temporalmente si está activo
    if (juegoActivo && contadorInterval) {
        clearInterval(contadorInterval); // Pausar el cronómetro
    }

    Swal.fire({
        title: '<h2 class="text-xl font-bold text-blue-600 mb-4">Instrucciones</h2>',
        html: `
            <div class="text-left">
                <p class="mb-2">¡Bienvenido al juego de encontrar al Grinch! 🎄</p>
                <p class="mb-2">El objetivo del juego es encontrar al Grinch en el menor número de movimientos posibles.</p>
                <p class="mb-2">Cada tarjeta tiene un color diferente, pero solo una de ellas es el Grinch.</p>
                <p class="mb-2">El Grinch es tan patoso que va dejando rastro por donde pasa, esto podra ayudarte a encontrarlo.</p>
                <p class="mb-2">Haz clic en una tarjeta para revelar su color y descubrir si es el Grinch.</p>
                <p class="mb-2">¡Buena suerte y diviértete!</p>
        `,
        icon: 'info',
        confirmButtonText: '¡Entendido!',
        confirmButtonColor: '#4CAF50',
    }).then(() => {
        // Reanudar el cronómetro si el juego sigue activo
        if (juegoActivo) {
            cronometro(); // Reiniciar el cronómetro
        }
    });
}
