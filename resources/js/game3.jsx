import Phaser from 'phaser';
import Swal from 'sweetalert2';

// Configuración de Phaser
const config = {
  type: Phaser.AUTO,
  width: '100%',  // Usar el 100% del ancho del contenedor
  height: '100%', // Usar el 100% de la altura del contenedor
  parent: 'game-container',  // Referencia el div con el id "game-container"
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: false
    }
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};

const infoButton = document.querySelector('.info');
const game = new Phaser.Game(config);

document.addEventListener("DOMContentLoaded", function() {
    // Obtener el botón de información
    const infoButton = document.querySelector('.info');
    
    // Verificar que el botón exista
    if (infoButton) {
      // Agregar el evento de click
      infoButton.addEventListener('click', infoJuego);
    }
  });


let trineo;
let regalos;
let obstaculos;
let cursors;
let score = 0;
let scoreText;
let gameOver = false;



function preload() {
  console.log('Cargando imágenes...');
  this.load.image('trineo', gameAssets.trineo);
  this.load.image('regalo', gameAssets.regalo);
  this.load.image('arbol', gameAssets.arbol);
  
}

function create() {
    console.log('Creando la escena...');
  
    // Fondo de nieve
    this.add.tileSprite(400, 300, 800, 600, 'nieve').setScrollFactor(0);
  
    // Crear el trineo en la parte inferior
    trineo = this.physics.add.sprite(400, 500, 'trineo');
    trineo.setCollideWorldBounds(true);
    trineo.setScale(0.1);  // Redimensionar el trineo
  
    // Crear los regalos con posiciones aleatorias
    regalos = this.physics.add.group({ key: 'regalo', repeat: 5 });
    regalos.children.iterate(function (regalo) {
      regalo.setScale(0.1); // Redimensionar los regalos
      regalo.setPosition(Phaser.Math.Between(0, 800), Phaser.Math.Between(-200, -50)); // Posición aleatoria
      regalo.setVelocityY(Phaser.Math.Between(50, 150)); // Velocidad aleatoria
    });
  
    // Crear los obstáculos (árboles) con posiciones aleatorias
    obstaculos = this.physics.add.group({ key: 'arbol', repeat: 3 });
    obstaculos.children.iterate(function (arbol) {
      arbol.setScale(0.2); // Redimensionar los árboles
      arbol.setPosition(Phaser.Math.Between(0, 800), Phaser.Math.Between(-200, -50)); // Posición aleatoria
      arbol.setVelocityY(Phaser.Math.Between(100, 200)); // Velocidad aleatoria
    });
  
    // Detectar la colisión de trineo con regalos
    this.physics.add.overlap(trineo, regalos, collectGift, null, this);
    // Detectar colisión con obstáculos
    this.physics.add.collider(trineo, obstaculos, hitObstacle, null, this);
  
    // Configuración de teclas para mover el trineo
    cursors = this.input.keyboard.createCursorKeys();
  
    // Texto de puntuación
    scoreText = this.add.text(16, 16, 'Puntos: 0', { fontSize: '32px', fill: '#fff' });
  
    // Color de fondo de la cámara
    this.cameras.main.setBackgroundColor('#a8d0e6');
  }


function update() {
  if (gameOver) return;

  if (cursors.left.isDown) {
    trineo.setVelocityX(-200);
  } else if (cursors.right.isDown) {
    trineo.setVelocityX(200);
  } else if (cursors.up.isDown) {
    trineo.setVelocityY(-200);
  } else if (cursors.down.isDown) {
    trineo.setVelocityY(200);
  } else {
    trineo.setVelocityX(0);
    trineo.setVelocityY(0);
  }

  regalos.children.iterate(function (regalo) {
    regalo.y += 2;
    if (regalo.y > 600) regalo.y = 0; // Reiniciar posición
  });

  obstaculos.children.iterate(function (arbol) {
    arbol.y += 2;
    if (arbol.y > 600) arbol.y = 0;
  });
}

function collectGift(trineo, regalo) {
  regalo.disableBody(true, true);
  score += 10;
  scoreText.setText('Puntos: ' + score);
}

function hitObstacle(trineo, arbol) {
    gameOver = true;
    this.physics.pause();  // Pausar la física al momento de la colisión
    trineo.setTint(0xff0000);  // Cambiar el color del trineo para indicar que ha chocado
    scoreText.setText('¡Juego Terminado! Puntos: ' + score);  // Mostrar el puntaje final
  
    // Mostrar alerta de fin de juego
    Swal.fire({
      title: '<h2 class="text-xl font-bold text-red-600 mb-4">¡Te has chocado!</h2>',
      html: `
        <div class="text-center">
          <p class="text-gray-700 leading-relaxed mb-2">
            <strong>¡Fin del juego!</strong>
          </p>
          <p class="text-gray-800 font-bold text-3xl mb-4">
            <span class="text-yellow-500">Puntuación Final:</span> <span class="text-red-500">${score}</span>
          </p>
        </div>`,
      icon: 'error',
      confirmButtonText: '¡Reiniciar!',
      confirmButtonColor: '#FF6347',
    }).then(() => {
      reiniciarJuego();  // Llamar a la función para reiniciar el juego
    });
  }
  

function reiniciarJuego() {
    // Pausar la física antes de reiniciar el juego
    game.physics.pause();
    
    // Restablecer el estado del juego
    gameOver = false;
    score = 0;
    scoreText.setText('Puntos: 0');
  
    // Reiniciar las posiciones del trineo y los objetos
    trineo.clearTint();
    trineo.setPosition(400, 500);
    trineo.setVelocity(0, 0); // Asegurarse de que el trineo no esté moviéndose
    
    // Reiniciar regalos y obstáculos
    regalos.children.iterate(function (regalo) {
      regalo.enableBody(true, regalo.x, regalo.y, true, true);
      regalo.setPosition(Phaser.Math.Between(0, 800), Phaser.Math.Between(-200, -50)); // Posición aleatoria
      regalo.setVelocityY(Phaser.Math.Between(50, 150)); // Velocidad aleatoria
    });
  
    obstaculos.children.iterate(function (arbol) {
      arbol.enableBody(true, arbol.x, arbol.y, true, true);
      arbol.setPosition(Phaser.Math.Between(0, 800), Phaser.Math.Between(-200, -50)); // Posición aleatoria
      arbol.setVelocityY(Phaser.Math.Between(100, 200)); // Velocidad aleatoria
    });
  
    // Reiniciar la física correctamente (habilitarla de nuevo)
    game.physics.resume();  // Asegurarse de que la física esté activa
    
    // Reanudar el control de movimiento del trineo
    cursors = this.input.keyboard.createCursorKeys();
  
    // Asegurarse de que el estado de la interfaz sea el adecuado (jugando, reiniciado, etc.)
    document.getElementById('status').innerText = 'Jugando';
    
    // También, si el juego está en una escena diferente, reiniciamos toda la escena
    game.scene.restart();  // Reiniciar toda la escena de Phaser
  }

// Mostrar las instrucciones del juego
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

export default game;
