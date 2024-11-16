// Variables
const cards = document.querySelectorAll('.card');
const startButton = document.querySelector('.start');
const restartButton = document.querySelector('.restart');
const infoButton = document.querySelector('.info');
const tiempoRestante = document.getElementById('tiempo_restante');

let cartasDestapadas = [];
let aciertos = 0;
let movimientos = 0;
let tiempo = 60;
let juegoActivo = false; // Estado del juego
let bloqueado = false; // Para evitar clics mientras las cartas se comparan
let contadorInterval; // Variable para almacenar el intervalo del cronómetro

// Eventos
startButton.addEventListener('click', iniciarJuego);
restartButton.addEventListener('click', reiniciarJuego);
infoButton.addEventListener('click', infoJuego);

// Función para iniciar el juego
function iniciarJuego() {
    // Deshabilitar el botón "Iniciar"
    startButton.disabled = true;
    startButton.classList.add('bg-gray-400', 'opacity-50');
    startButton.classList.remove('bg-green-500', 'hover:bg-green-600');

    // Asignar valores aleatorios a las cartas
    let valores = [];
    for (let i = 1; i <= 8; i++) {
        valores.push(i, i); // Añadir cada número dos veces para formar los pares
    }

    // Barajar los valores
    valores = valores.sort(() => Math.random() - 0.5);

    // Asignar los valores a las cartas
    cards.forEach((card, index) => {
        card.setAttribute('data-card-value', valores[index]); // Asignar el valor de cada carta
        card.innerText = ''; // Vaciar contenido de la carta
        card.style.backgroundColor = 'blue'; // Establecer color de fondo inicial
        card.disabled = false; // Habilitar cartas
        card.addEventListener('click', () => destapar(card)); // Asignar evento de clic a cada carta
    });

    // Reiniciar contadores
    aciertos = 0;
    movimientos = 0;
    document.getElementById('contador_aciertos').innerText = aciertos;
    document.getElementById('contador_movimientos').innerText = movimientos;

    // Iniciar el cronómetro
    cronometro();

    // Cambiar el estado del juego a activo
    juegoActivo = true;
}

// Función para destapar una carta
function destapar(carta) {
    if (!juegoActivo || bloqueado) return; // No hacer nada si el juego no está activo o si las cartas están bloqueadas

    // Verificar si la carta ya está destapada
    if (carta.innerText !== '') return; // Si la carta ya tiene valor, no hacer nada

    // Mostrar el valor de la carta
    const valor = carta.getAttribute('data-card-value');
    carta.innerText = valor;
    carta.style.backgroundColor = "white"; // Cambiar el color de fondo

    // Agregar la carta al array de cartas destapadas
    cartasDestapadas.push(carta);

    // Si ya hay dos cartas destapadas, comenzar la comparación
    if (cartasDestapadas.length === 2) {
        bloqueado = true; // Bloquear clics mientras se comparan las cartas

        // Comprobar si las cartas coinciden
        setTimeout(() => {
            const carta1 = cartasDestapadas[0];
            const carta2 = cartasDestapadas[1];

            if (carta1.innerText === carta2.innerText) {
                // Si las cartas coinciden, dejarlas visibles
                aciertos++;
                document.getElementById('contador_aciertos').innerText = aciertos;

                // Verificar si el jugador ganó
                if (aciertos === 8) {
                    Swal.fire({
                        title: '¡Felicidades!',
                        text: '¡Has encontrado todas las parejas!',
                        icon: 'success',
                        confirmButtonText: '¡Jugar de nuevo!',
                    }).then(() => {
                        reiniciarJuego();
                    });
                }
            } else {
                // Si no coinciden, ocultarlas nuevamente
                carta1.innerText = '';
                carta2.innerText = '';
                carta1.style.backgroundColor = 'blue';
                carta2.style.backgroundColor = 'blue';
            }

            // Incrementar el contador de movimientos
            movimientos++;
            document.getElementById('contador_movimientos').innerText = movimientos;

            // Vaciar el array de cartas destapadas y desbloquear los clics
            cartasDestapadas = [];
            bloqueado = false; // Ahora sí se pueden hacer clics
        }, 1000); // Esperar 1 segundo para comparar las cartas
    }
}

// Función para iniciar el cronómetro
function cronometro() {
    contadorInterval = setInterval(() => { // Usar la variable global
        tiempo--;
        tiempoRestante.innerHTML = tiempo; // Actualizar el tiempo restante
        if (tiempo <= 0) {
            clearInterval(contadorInterval); // Detener el cronómetro cuando el tiempo llegue a cero
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

// Función para reiniciar el juego
function reiniciarJuego() {
    
            // Habilitar el botón "Iniciar" para que se pueda usar de nuevo
            startButton.disabled = false;
            startButton.classList.remove('bg-gray-400', 'opacity-50');
            

            // Reiniciar el tiempo y los contadores
            tiempo = 60;
            tiempoRestante.innerText = tiempo;
            aciertos = 0;
            movimientos = 0;
            document.getElementById('contador_aciertos').innerText = aciertos;
            document.getElementById('contador_movimientos').innerText = movimientos;

            // Cambiar el estado del juego a inactivo
            juegoActivo = true;
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
                <p class="text-gray-700 leading-relaxed mb-2">
                    <strong>Objetivo:</strong> Encuentra todas las parejas de cartas iguales.
                </p>
                <p class="text-gray-700 leading-relaxed mb-2">
                    Para jugar, simplemente haz clic en las cartas para destaparlas y encontrar los pares.
                </p>
                <p class="text-gray-700 leading-relaxed mb-2">
                    Si las cartas coinciden, se quedarán visibles. Si no coinciden, se ocultarán nuevamente.
                </p>
                <p class="text-gray-700 font-semibold leading-relaxed">
                    ¡Buena suerte y diviértete!
                </p>
            </div>
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
