function startGame(gameId) {
    alert("Iniciando el juego con ID: " + gameId);
    // Redirige a la ruta correcta '/game/play/{id}' según el gameId
    window.location.href = '/game/play/' + gameId;
}

document.addEventListener('DOMContentLoaded', function () {
    const playButtons = document.querySelectorAll('.play-button');
    playButtons.forEach(button => {
        button.addEventListener('click', function () {
            const gameId = this.getAttribute('id');
            startGame(gameId); // Llama a la función de inicio con el ID del juego
        });
    });
});