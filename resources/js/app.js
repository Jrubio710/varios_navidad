document.addEventListener('DOMContentLoaded', () => {
    const toggleAsideButton = document.getElementById('toggleAsideButton');
    const aside = document.getElementById('aside');
    const showAsideButton = document.getElementById('showAsideButton');

    // Mostrar el aside inicialmente y ocultar el botón "Mostrar Juegos"
    aside.classList.remove('-translate-x-full');
    showAsideButton.classList.add('hidden');  // Ocultar el botón de mostrar al principio

    if (toggleAsideButton && aside && showAsideButton) {
        // Acción para ocultar el aside (deslizarlo fuera de la pantalla)
        toggleAsideButton.addEventListener('click', () => {
            aside.classList.add('-translate-x-full');        // Oculta el aside
            toggleAsideButton.classList.add('hidden');        // Oculta el botón "Ocultar Juegos"
            showAsideButton.classList.remove('hidden');       // Muestra el botón para mostrar el aside
        });

        // Acción para mostrar el aside (deslizarlo de nuevo dentro de la pantalla)
        showAsideButton.addEventListener('click', () => {
            aside.classList.remove('-translate-x-full');      // Muestra el aside
            toggleAsideButton.classList.remove('hidden');     // Muestra el botón "Ocultar Juegos"
            showAsideButton.classList.add('hidden');          // Oculta el botón para mostrar el aside
        });
    }
});



function cambiarNumeroEnUrl(gameId) {
    let url = window.location.origin + window.location.pathname;
    window.location.href = url.replace(/\/(\d+)(\/?)$/, `/${gameId}$2`);
}


function startGame(gameId) {
    let baseUrl = window.location.origin + window.location.pathname;
    window.location.href = baseUrl + '/gameplay/' + gameId;
}

