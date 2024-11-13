<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Página Principal de Juegos</title>
    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>
<body class="bg-gray-100">


    <header class="bg-blue-500 text-white p-4 fixed top-0 left-0 w-full z-10 shadow-lg">
        <div class="container mx-auto flex justify-between items-center">
            <a href="{{ route('games.game') }}" 
               class="text-2xl font-semibold px-4 py-2 rounded-lg bg-gradient-to-r from-blue-400 to-blue-600 shadow-md transition duration-300 transform hover:scale-105 hover:from-blue-500 hover:to-blue-700 hover:shadow-lg">
                X-MASS GAMES
            </a>
        </div>
    </header>
    
   
    <div class="main-layout pt-24"> 
        <h1 class="text-4xl text-center font-bold text-blue-800 mb-12">Escoge un Juego Navideño</h1>

        <
        <div class="games-container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
            @foreach($games as $game)
                <div class="game-card bg-white text-gray-800 rounded-lg shadow-lg hover:shadow-2xl transition-all p-6 flex flex-col justify-between">
                    <h2 class="text-2xl font-bold text-center text-gray-900 mb-4">{{ $game->name }}</h2>
                    
                    
                    <div class="w-full h-48 relative mb-4">
                        <img src="{{ asset('img/juego' . $game->id . '.png') }}" alt="{{ $game->name }}" class="w-full h-full object-contain rounded-md">
                    </div>
                    
                    <p class="text-center text-gray-600 mb-6">{{ $game->description }}</p>
                    
                    
                    <div class="flex-grow"></div> 
                    <button class="play-button bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold py-3 px-8 rounded-full hover:bg-gradient-to-l hover:from-blue-500 hover:to-teal-500 transition-all duration-300 transform hover:scale-105 mx-auto">
                        Jugar
                    </button>
                </div>
            @endforeach
        </div>
    </div>

</body>
</html>
