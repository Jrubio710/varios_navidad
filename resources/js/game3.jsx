import Phaser from 'phaser';
import Swal from 'sweetalert2';

// Configuración de Phaser
const config = {
  type: Phaser.AUTO,
  width: '100%',
  height: '100%',
  parent: 'game-container',
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

let game; // Declaracion de la variable del juego

let trineo;
let regalos;
let obstaculos;
let cursors;
let score = 0;
let scoreText;
let gameOver = false;
let gameStarted = false; // Variable para controlar si el juego ha comenzado
let regalosEvent;
let obstaculosEvent;
let difficultyLevel = 1; // Nivel de dificultad inicial

function preload() {
  console.log('Cargando imágenes...');
  this.load.image('trineo', gameAssets.trineo);
  this.load.image('regalo', gameAssets.regalo);
  this.load.image('arbol', gameAssets.arbol);
  this.load.image('nieve', gameAssets.nieve);
}

function create() {
  console.log('Creando la escena...');

  // Fondo de nieve centrado y ajustado
  const bg = this.add.image(this.scale.width / 2, this.scale.height / 2, 'nieve');
  bg.setOrigin(0.5, 0.5);
  const scaleX = this.scale.width / bg.width;
  const scaleY = this.scale.height / bg.height;
  const scale = Math.max(scaleX, scaleY);
  bg.setScale(scale);

  // Crear el trineo en la parte inferior
  trineo = this.physics.add.sprite(400, 500, 'trineo');
  trineo.setCollideWorldBounds(true);
  trineo.setScale(0.1);  // Redimensionar el trineo

  // Crear grupos para regalos y obstáculos
  regalos = this.physics.add.group();
  obstaculos = this.physics.add.group();

  // Configuración de teclas para mover el trineo
  cursors = this.input.keyboard.createCursorKeys();

  // Texto de puntuación
  scoreText = this.add.text(16, 16, 'Puntos: 0', { fontSize: '32px', fill: '#fff' });

  // Color de fondo de la cámara
  this.cameras.main.setBackgroundColor('#a8d0e6');

  // Detectar colisión con regalos
  this.physics.add.overlap(trineo, regalos, collectGift, null, this);
  // Detectar colisión con obstáculos
  this.physics.add.collider(trineo, obstaculos, hitObstacle, null, this);
}

function update() {
  if (gameOver || !gameStarted) return; // No hacer nada si el juego ha terminado o no ha comenzado

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

  // Actualizar posición de regalos y obstáculos
  regalos.children.iterate(function (regalo) {
    regalo.y += 2;// Velocidad de caída de los regalos
    if (regalo.y > 600) regalo.y = 0;// Reiniciar posición si se sale de la pantalla
  });

  obstaculos.children.iterate(function (arbol) {
    arbol.y += 2;// Velocidad de caída de los obstáculos
    if (arbol.y > 600) arbol.y = 0;// Reiniciar posición si se sale de la pantalla
  });
}

function collectGift(trineo, regalo) {// Función para recoger regalos
  regalo.disableBody(true, true);
  score += 10;
  scoreText.setText('Puntos: ' + score);

  
  if (score % 100 === 0) {// Aumentar la dificultad cada 100 puntos
    updateDifficulty();
  }
}

function hitObstacle(trineo, arbol) {// Función para chocar con obstáculos
  gameOver = true;
  this.physics.pause();
  trineo.setTint(0xff0000);// Cambiar color del trineo al chocar
  scoreText.setText('¡Juego Terminado! Puntos: ' + score);

  Swal.fire({
    title: '¡Te has chocado!',
    text: `Puntuación final: ${score}`,
    icon: 'error',
    confirmButtonText: 'OK'
  }).then(() => {
    resetGameState();
  });
}

function generarRegalo(scene) {
  const x = Phaser.Math.Between(50, scene.scale.width - 50);// Posición aleatoria en el eje X
  const y = Phaser.Math.Between(-200, -50);// Posición aleatoria en el eje Y
  const regalo = scene.physics.add.sprite(x, y, 'regalo').setScale(0.1);// Crear regalo
  regalo.setVelocityY(Phaser.Math.Between(50, 150));
  regalos.add(regalo);
}

function generarObstaculo(scene) {
  const maxObstaculos = 20; // Maximum number of obstacles allowed on the screen at the same time
  if (obstaculos.countActive(true) < maxObstaculos) {
    const x = Phaser.Math.Between(50, scene.scale.width - 50);
    const y = Phaser.Math.Between(-200, -50);
    const arbol = scene.physics.add.sprite(x, y, 'arbol').setScale(0.2);
    arbol.setVelocityY(Phaser.Math.Between(100, 300)); // Set a random speed between 100 and 300
    arbol.setSize(arbol.width * 0.5, arbol.height * 0.5); // Adjust the hitbox size
    obstaculos.add(arbol);
  }
}

// Function to update the difficulty level
function updateDifficulty() {
  difficultyLevel += 1;

  //limpiar eventos de tiempo existentes
  if (regalosEvent) regalosEvent.remove(false);
  if (obstaculosEvent) obstaculosEvent.remove(false);

  const scene = game.scene.scenes[0]; //Tomar la escena actual

  // Configurar evento para generar regalos periódicamente con mayor frecuencia
  regalosEvent = scene.time.addEvent({
    delay: Phaser.Math.Between(1000 / difficultyLevel, 3000 / difficultyLevel), //Aumentar la frecuencia de generación de regalos
    callback: () => generarRegalo(scene),// Llamar a la función para generar regalos
    callbackScope: scene,
    loop: true
  });

  // Configurar evento para generar obstáculos periódicamente con mayor frecuencia
  obstaculosEvent = scene.time.addEvent({
    delay: Phaser.Math.Between(1000 / difficultyLevel, 3000 / difficultyLevel), //Aumentar la frecuencia de generación de obstáculos
    callback: () => generarObstaculo(scene),// Llamar a la función para generar obstáculos
    callbackScope: scene,
    loop: true
  });
}

//Funcion para reiniciar el estado del juego
function resetGameState() {
  gameOver = false;
  gameStarted = false;
  score = 0;
  scoreText.setText('Puntos: ' + score);
  regalos.clear(true, true);
  obstaculos.clear(true, true);
  trineo.clearTint();
  trineo.setPosition(400, 500);
  if (regalosEvent) regalosEvent.remove(false);
  if (obstaculosEvent) obstaculosEvent.remove(false);
  document.getElementById('start-restart-btn').innerText = 'Iniciar Juego';
  difficultyLevel = 1; // Reset difficulty level
}

// Funcion para iniciar o reiniciar el juego
function startOrRestartGame() {
  const scene = game.scene.scenes[0]; //Tomar la escena actual
  gameStarted = true; // Cambiar el estado del juego a iniciado
  gameOver = false;
  score = 0;
  scoreText.setText('Puntos: ' + score);
  regalos.clear(true, true);
  obstaculos.clear(true, true);
  trineo.clearTint();
  trineo.setPosition(400, 500);
  scene.physics.resume();

  //Limpiar eventos de tiempo existentes
  if (regalosEvent) regalosEvent.remove(false);
  if (obstaculosEvent) obstaculosEvent.remove(false);

  // Configurar evento para generar regalos periódicamente
  regalosEvent = scene.time.addEvent({
    delay: Phaser.Math.Between(1000, 3000), // Intervalo aleatorio entre 1 y 3 segundos
    callback: () => generarRegalo(scene),
    callbackScope: scene,
    loop: true
  });

  // Configurar evento para generar obstáculos periódicamente
  obstaculosEvent = scene.time.addEvent({
    delay: Phaser.Math.Between(1000, 3000), // Intervalo aleatorio entre 1 y 3 segundos
    callback: () => generarObstaculo(scene),
    callbackScope: scene,
    loop: true
  });

  // Cambiar el texto del botón a "Reiniciar Juego"
  document.getElementById('start-restart-btn').innerText = 'Reiniciar Juego';
}

// Función para mostrar las instrucciones del juego
function showInstructions() {
  Swal.fire({
    title: '<h2 class="text-xl font-bold text-blue-600 mb-4">Instrucciones del Juego</h2>',
    html: `
      <div class="text-left">
        <p class="text-gray-700 leading-relaxed mb-2">
          <strong>Objetivo:</strong> Recoge tantos regalos como puedas mientras evitas los obstáculos.
        </p>
        <p class="text-gray-700 leading-relaxed mb-2">
          Usa las teclas de flecha para mover el trineo.
        </p>
        <p class="text-gray-700 leading-relaxed mb-2">
          Cada regalo recogido te da 10 puntos.
        </p>
        <p class="text-gray-700 leading-relaxed mb-2">
          Si chocas con un obstáculo, el juego termina.
        </p>
        <p class="text-gray-700 leading-relaxed mb-2">
          ¡Buena suerte y diviértete!
        </p>
      </div>`,
    confirmButtonText: '¡Entendido, a jugar!',
    confirmButtonColor: '#4CAF50',
  });
}

// Añadir evento para cargar el juego cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  const infoButton = document.querySelector('.info');
  if (infoButton) {
    infoButton.addEventListener('click', showInstructions);
  }

  // Inicializar el juego
  game = new Phaser.Game(config);

  // Añadir evento al botón de inicio/reinicio
  const startButton = document.getElementById('start-restart-btn');
  if (startButton) {
    startButton.addEventListener('click', startOrRestartGame);
  }
});

export default game;