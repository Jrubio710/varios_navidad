<header class="bg-gray-100 py-4 shadow-md">
    <div class="logo text-center">
        <h1 class="text-2xl font-bold text-black">Minijuegos</h1>
    </div>


    <div id="game-carousel" class="carousel-container mt-4 relative">
        <div class="carousel-wrapper overflow-hidden flex justify-start space-x-4">
            @foreach($games as $game)
                <div class="carousel-slide w-60">
                    <img class="w-full h-32 object-cover rounded-md" src="{{ asset('img/juego' . $game->id . '.png') }}" alt="{{ $game->name }}">
                    <h2 class="text-sm font-semibold mt-2">{{ $game->name }}</h2>
                    <button class="play-button w-full mt-2" data-id="{{ $game->id }}">Jugar</button>
                </div>
            @endforeach
        </div>


        <div class="absolute top-1/2 left-0 transform -translate-y-1/2 px-4">
            <button class="prev bg-gray-600 text-white p-2 rounded-full">&#60;</button>
        </div>
        <div class="absolute top-1/2 right-0 transform -translate-y-1/2 px-4">
            <button class="next bg-gray-600 text-white p-2 rounded-full">&#62;</button>
        </div>
    </div>
</header>
