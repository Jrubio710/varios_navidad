<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Minijuegos</title>
    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>
<body>
    <!-- Header -->
    <x-header />

    <!-- Contenido principal de la página -->
    <div class="main-layout">
        <!-- Aside (Barra lateral) -->
        <x-aside/>

        <!-- Contenido de los juegos y el leaderboard -->
        <div class="content">
            <!-- Leaderboard -->
            <x-leaderboard />

            <!-- Contenedor de Juego Dinámico -->
            <x-game-container>
                @yield('game-content')
            </x-game-container>
        </div>
    </div>

    <!-- Footer -->
    <x-footer />

</body>
</html>
