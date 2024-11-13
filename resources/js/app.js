document.addEventListener('DOMContentLoaded', () => {
    const toggleAsideButton = document.getElementById('toggleAsideButton');
    const aside = document.getElementById('aside');
    const showAsideButton = document.getElementById('showAsideButton');

    // Asegurarse de que el aside sea visible inicialmente (sin translate-x)
    aside.classList.remove('translate-x-[-100%]');
    showAsideButton.classList.add('hidden');  // El botón de mostrar está oculto al principio

    if (toggleAsideButton && aside && showAsideButton) {
        // Acción para ocultar el aside (deslizarlo fuera de la pantalla)
        toggleAsideButton.addEventListener('click', () => {
            aside.classList.add('translate-x-[-100%]');  // Mover el aside fuera de la pantalla
            showAsideButton.classList.remove('hidden');  // Mostrar el botón para mostrar el aside
        });

        // Acción para mostrar el aside (deslizarlo de nuevo dentro de la pantalla)
        showAsideButton.addEventListener('click', () => {
            aside.classList.remove('translate-x-[-100%]');  // Mover el aside dentro de la pantalla
            showAsideButton.classList.add('hidden');  // Ocultar el botón de mostrar el aside
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
