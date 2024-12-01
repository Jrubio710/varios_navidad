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
let puntos = 0;
let juegoActivo = false; // Estado del juego
let bloqueado = false; // Para evitar clics mientras las cartas se comparan
let contadorInterval; // Variable para almacenar el intervalo del cronómetro

// Obtener el ID del juego desde la URL
const gameId =  1;

// Eventos
startButton.addEventListener('click', iniciarJuego);
restartButton.addEventListener('click', reiniciarJuego);
infoButton.addEventListener('click', infoJuego);

// Función para actualizar los puntos solo por aciertos
function actualizarPuntosAciertos() {
    puntos = aciertos * 100; // Solo sumamos los puntos por aciertos
    document.getElementById('contador_puntos').innerText = puntos;
}

// Función para calcular la puntuación final
function calcularPuntosFinales() {
    // Puntos por aciertos (ya calculados en tiempo real)
    const puntosPorAciertos = aciertos * 100;

    // Puntos por tiempo (se suman solo al final)
    const puntosPorTiempo = tiempo * 5;

    // Penalización por movimientos (se resta solo al final)
    const penalizacionMovimientos = movimientos * 10;

    // Calculamos la puntuación final
    puntos = puntosPorAciertos + puntosPorTiempo - penalizacionMovimientos;

    // Evitar puntuaciones negativas
    if (puntos < 0) puntos = 0;

    // Mostrar la puntuación final
    document.getElementById('contador_puntos').innerText = puntos;

    return puntos;  
}

// Función para iniciar el juego
function iniciarJuego() {
    startButton.disabled = true;
    startButton.classList.add('bg-gray-400', 'opacity-50');
    startButton.classList.remove('bg-green-500', 'hover:bg-green-600');

    let valores = [];
    for (let i = 1; i <= 8; i++) {
        valores.push(i, i);
    }
    valores = valores.sort(() => Math.random() - 0.5);

    cards.forEach((card, index) => {
        card.setAttribute('data-card-value', valores[index]);
        card.innerText = '';
        card.style.backgroundColor = 'blue';
        card.disabled = false;
        card.addEventListener('click', () => destapar(card));
    });

    aciertos = 0;
    movimientos = 0;
    puntos = 0;
    tiempo = 60;

    document.getElementById('contador_aciertos').innerText = aciertos;
    document.getElementById('contador_movimientos').innerText = movimientos;
    document.getElementById('contador_puntos').innerText = puntos;

    cronometro();
    juegoActivo = true;
}

// Función para destapar una carta
function destapar(carta) {
    if (!juegoActivo || bloqueado) return;

    if (carta.innerText !== '') return;

    const valor = carta.getAttribute('data-card-value');
    carta.innerText = valor;
    carta.style.backgroundColor = 'white';
    cartasDestapadas.push(carta);

    if (cartasDestapadas.length === 2) {
        bloqueado = true;

        setTimeout(() => {
            const carta1 = cartasDestapadas[0];
            const carta2 = cartasDestapadas[1];

            if (carta1.innerText === carta2.innerText) {
                aciertos++;
                document.getElementById('contador_aciertos').innerText = aciertos;

                // Actualizar solo los puntos por aciertos en tiempo real
                actualizarPuntosAciertos();

                if (aciertos === 8) {
                    clearInterval(contadorInterval); // Detener el cronómetro
                    calcularPuntosFinales(); // Calcular la puntuación final

                    Swal.fire({
                        title: '<h2 class="text-xl font-bold text-green-600 mb-4">¡Felicidades!</h2>',
                        html: `
                            <div class="text-center">
                                <p class="text-gray-700 leading-relaxed mb-2">
                                    <strong>¡Has encontrado todas las parejas!</strong>
                                </p>
                                <p class="text-gray-800 font-bold text-3xl mb-4">
                                    <span class="text-yellow-500">Puntuación Final:</span> <span class="text-green-500">${puntos}</span>
                                </p>
                                <p class="text-gray-700 leading-relaxed mb-4">
                                    ¡Increíble! 
                                </p>
                            </div>`,
                        icon: 'success',
                        confirmButtonText: '¡Jugar de nuevo!',
                        confirmButtonColor: '#4CAF50',
                        customClass: {
                            title: 'font-bold text-3xl text-green-600',
                            htmlContainer: 'text-center',
                        }
                    }).then(() => {
                        reiniciarJuego();
                    });
                }
            } else {
                carta1.innerText = '';
                carta2.innerText = '';
                carta1.style.backgroundColor = 'blue';
                carta2.style.backgroundColor = 'blue';
            }

            movimientos++;
            document.getElementById('contador_movimientos').innerText = movimientos;
            cartasDestapadas = [];
            bloqueado = false;
        }, 1000);
    }
}

// Función para iniciar el cronómetro
function cronometro() {
    contadorInterval = setInterval(() => {
        tiempo--;
        tiempoRestante.innerHTML = tiempo;

        if (tiempo <= 0) {
            clearInterval(contadorInterval); // Detener el cronómetro
            calcularPuntosFinales(); // Calcular la puntuación final

            Swal.fire({
                title: '¡Se acabó el tiempo! 😱',
                text: `Puntuación final: ${puntos}`,
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
    clearInterval(contadorInterval);
    tiempo = 60;
    aciertos = 0;
    movimientos = 0;
    puntos = 0;

    document.getElementById('contador_aciertos').innerText = aciertos;
    document.getElementById('contador_movimientos').innerText = movimientos;
    document.getElementById('contador_puntos').innerText = puntos;
    tiempoRestante.innerText = tiempo;

    startButton.disabled = false;
    startButton.classList.remove('bg-gray-400', 'opacity-50');
    startButton.classList.add('bg-green-500', 'hover:bg-green-600');
    juegoActivo = false;
}

// Función para mostrar las instrucciones del juego
function infoJuego() {
    if (juegoActivo && contadorInterval) {
        clearInterval(contadorInterval);
    }

    Swal.fire({
        title: '<h2 class="text-xl font-bold text-blue-600 mb-4">Instrucciones del Juego</h2>',
        html: `
            <div class="text-left">
                <p class="text-gray-700 leading-relaxed mb-2">
                    <strong>Objetivo:</strong> Encuentra todas las parejas de cartas iguales.
                </p>
                <p class="text-gray-700 leading-relaxed mb-2">
                    El juego dura <strong>60 segundos</strong>. ¡Tienes que ser rápido!
                </p>
                <p class="text-gray-700 leading-relaxed mb-4">
                    La puntuación se calcula de la siguiente forma:
                </p>
                <ul class="list-disc pl-5 text-gray-700">
                    <li><strong>Por cada acierto:</strong> ¡Ganas 100 puntos!</li>
                    <li><strong>Por el tiempo restante:</strong> ¡Ganas 5 puntos por cada segundo que quede!</li>
                    <li><strong>Por cada movimiento:</strong> ¡Pierdes 10 puntos por cada movimiento realizado!</li>
                </ul>
                <p class="text-gray-700 leading-relaxed mt-4">
                    ¡Recuerda, cuanto menos tiempo y menos movimientos uses, más puntos podrás ganar! 
                </p>
            </div>`,
        confirmButtonText: '¡Entendido, ¡a jugar!',
        confirmButtonColor: '#4CAF50', 
    }).then(() => {
        cronometro();
    });
}
