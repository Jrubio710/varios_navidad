function startGame(gameId) {
    alert("Iniciando el juego con ID: " + gameId);
    
    window.location.href = '/game/play'+gameId;
}

document.addEventListener('DOMContentLoaded', function () {
    const playButtons = document.querySelectorAll('.play-button');
    playButtons.forEach(button => {
        button.addEventListener('click', function () {
            const gameId = this.getAttribute('id');
            startGame(gameId); 
        });
    });
});