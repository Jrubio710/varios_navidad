function startGame(gameId) {
    

        // Usa la ruta actual para construir la nueva URL
        let baseUrl = window.location.origin + window.location.pathname;

        // Navega a la ruta deseada concatenando el ID
        window.location.href = baseUrl + '/gameplay/' + gameId;

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
