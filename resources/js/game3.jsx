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

let game; // Declare the game variable here

let trineo;
let regalos;
let obstaculos;
let cursors;
let score = 0;
let scoreText;
let gameOver = false;
let gameStarted = false; // Flag to control the game state
let regalosEvent;
let obstaculosEvent;

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
  if (gameOver || !gameStarted) return; // Do not update if the game is over or not started

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
    regalo.y += 2;
    if (regalo.y > 600) regalo.y = 0;
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
  this.physics.pause();
  trineo.setTint(0xff0000);
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
  const x = Phaser.Math.Between(50, scene.scale.width - 50);
  const y = Phaser.Math.Between(-200, -50);
  const regalo = scene.physics.add.sprite(x, y, 'regalo').setScale(0.1);
  regalo.setVelocityY(Phaser.Math.Between(50, 150));
  regalos.add(regalo);
}

function generarObstaculo(scene) {
  const maxObstaculos = 10; // Maximum number of obstacles allowed on the screen at the same time
  if (obstaculos.countActive(true) < maxObstaculos) {
    const x = Phaser.Math.Between(50, scene.scale.width - 50);
    const y = Phaser.Math.Between(-200, -50);
    const arbol = scene.physics.add.sprite(x, y, 'arbol').setScale(0.2);
    arbol.setVelocityY(Phaser.Math.Between(100, 300)); // Set a random speed between 100 and 300
    obstaculos.add(arbol);
  }
}

// Function to reset the game state
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
}

// Function to start or restart the game
function startOrRestartGame() {
  const scene = game.scene.scenes[0]; // Get the current scene
  gameStarted = true; // Set the gameStarted flag to true
  gameOver = false;
  score = 0;
  scoreText.setText('Puntos: ' + score);
  regalos.clear(true, true);
  obstaculos.clear(true, true);
  trineo.clearTint();
  trineo.setPosition(400, 500);
  scene.physics.resume();

  // Clear existing timed events
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

  // Update button text
  document.getElementById('start-restart-btn').innerText = 'Reiniciar Juego';
}

// Expose the functions to the global scope
window.startOrRestartGame = startOrRestartGame;
window.resetGameState = resetGameState;

// Initialize the game when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  game = new Phaser.Game(config);
});

export default game;