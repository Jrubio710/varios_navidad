<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Minijuegos</title>
    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>
<body class="flex flex-col min-h-screen pt-20"> <!-- Ajustamos pt-20 para espacio encima del contenido debido al header fijo -->

    <!-- Header -->
    <x-header />

    <!-- Contenido principal de la página -->
    <div class="flex-grow flex relative"> <!-- Flex row para disposición en fila y relative para el aside -->
        
        <!-- Contenedor para el Aside (Aseguramos que no se solape con el footer) -->
        <div class="flex-shrink-0"> <!-- Este div asegura que el aside no se sobreponga al footer -->
            <!-- Aside (Barra lateral) con desplazamiento y altura controlada -->
            <x-aside id="aside" class="fixed top-20 left-0 w-80 h-full transform -translate-x-full transition-all duration-500 ease-in-out overflow-y-auto z-20 flex flex-col" />
        </div>

        <!-- Contenido de los juegos y el leaderboard -->
        <div class="flex-grow pl-80 p-4 pb-20"> <!-- Añadimos un padding a la izquierda para evitar que el contenido se solape con el aside y padding-bottom para evitar que se solape con el footer -->
            <!-- Leaderboard -->
            <x-leaderboard />

            <!-- Contenedor de Juego Dinámico -->
            <x-game-container>
                @yield('game-content')
            </x-game-container>
        </div>
    </div>

    <!-- Footer -->
    <x-footer class="mt-auto " /> <!-- Esto asegura que el footer siempre quede al final -->

</body>
</html>
