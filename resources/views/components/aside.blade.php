<div>
    <!-- Aside con juegos (oculto por defecto con -translate-x-full) -->
    <div id="aside" class="bg-blue-500 text-white p-6 fixed top-20 left-0 w-80 h-screen transform -translate-x-full transition-all duration-500 ease-in-out overflow-y-auto z-20 flex flex-col">
        
        <!-- Botón para ocultar el aside -->
        <button id="toggleAsideButton" class="bg-blue-700 hover:bg-blue-600 text-white px-6 py-3 mb-6 rounded-full text-lg font-semibold shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 z-30">
            Ocultar Juegos
        </button>

        <div class="games-container flex-grow overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-500 scrollbar-track-gray-200 pb-8">
            @foreach($games as $game)
                <div class="game-card bg-white text-gray-800 rounded-lg shadow-lg hover:shadow-2xl transition-all p-4 mb-4 max-h-[350px]">
                    <a href="{{ route('games.show', $game->id) }}">
                        <img src="{{ asset('img/juego' . $game->id . '.png') }}" alt="{{ $game->name }}" class="w-full h-32 object-cover rounded-md my-4">
                    </a>
                    <p class="text-center text-gray-600 mb-4 text-sm truncate" style="max-height: 60px; overflow: hidden;">{{ $game->description }}</p>
                </div>
            @endforeach
        </div>

        <!-- Aseguramos que haya un espacio al fondo -->
        <div class="h-20"></div>
    </div>

    <!-- Botón para mostrar el aside cuando está oculto, posicionado en el centro vertical -->
    <button id="showAsideButton" class="show-aside-button hidden fixed top-1/2 left-0 transform -translate-y-1/2 bg-blue-700 hover:bg-blue-600 text-white text-2xl rounded-full p-4 shadow-lg transition-all duration-300 z-30 hover:scale-110">
        ➤
    </button>
</div>
