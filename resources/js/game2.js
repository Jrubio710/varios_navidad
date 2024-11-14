// Variables
const tiempoRestante = document.getElementById('tiempo_restante');
const colors = [
    "#39FF14", // Neon Green
    "#FF6EC7", // Hot Pink
    "#01F9C6", // Turquoise
    "#F4F92A", // Lemon Yellow
];

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
});

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
    }
}

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
        if (card.id === grinchPosition) {
            card.style.backgroundColor = 'black';
        }
    });

    // Guarda la posición del Grinch en sessionStorage para que se pueda acceder desde `checkGrinch`
    sessionStorage.setItem('grinchPosition', grinchPosition);
    console.log("Grinch está en la posición:", grinchPosition);
}

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
