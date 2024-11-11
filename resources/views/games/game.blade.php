<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Página Principal de Juegos</title>
    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>
<body>
    <h1>Escoge un Juego Navideño</h1>

   
    <div class="games-container">
        @foreach($games as $game)
            <div class="game-card">
                <h2>{{ $game->name }}</h2>
                <img src="{{ asset('img/juego' . $game->id . '.png') }}" alt="{{ $game->name }}">
                <p>{{ $game->description }}</p>
                <button class="play-button" data-id="{{ $game->id }}">Jugar</button>
            </div>
        @endforeach
    </div>


</body>
</html>
