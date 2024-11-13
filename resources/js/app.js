function startGame(gameId) {
    let baseUrl = window.location.origin + window.location.pathname;
    window.location.href = baseUrl + '/gameplay/' + gameId;
}

document.addEventListener('DOMContentLoaded', function () {
    const playButtons = document.querySelectorAll('.play-button');
    playButtons.forEach(button => {
        button.addEventListener('click', function () {
            const gameId = this.getAttribute('data-id');
            startGame(gameId);
        });
    });

    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    const carouselWrapper = document.querySelector('.carousel-wrapper');
    const slideWidth = document.querySelector('.carousel-slide').offsetWidth;

    let currentIndex = 0;

    prevButton.addEventListener('click', function () {
        if (currentIndex > 0) {
            currentIndex--;
            carouselWrapper.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
        }
    });

    nextButton.addEventListener('click', function () {
        if (currentIndex < carouselWrapper.children.length - 1) {
            currentIndex++;
            carouselWrapper.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
        }
    });
});


