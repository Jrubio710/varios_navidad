import './bootstrap';



// Función para manejar el clic en el botón "Jugar"
function startGame(gameId) {
    // Ejemplo de acción con JS, podrías mostrar una confirmación o hacer algo con el ID del juego
    alert("Iniciando el juego con ID: " + gameId);
    // Redirigir al usuario al juego (esto debe adaptarse a tu aplicación)
    window.location.href = '/game/play/' + gameId; // Asumiendo que la ruta es '/game/play/{id}'
}

// Asegurarse de que el DOM esté cargado antes de agregar los eventos
document.addEventListener('DOMContentLoaded', function () {
    // Obtener todos los botones "Jugar" y añadirles el evento
    const playButtons = document.querySelectorAll('.play-button');
    playButtons.forEach(button => {
        button.addEventListener('click', function () {
            const gameId = this.getAttribute('id');
            startGame(gameId);
        });
    });
});
