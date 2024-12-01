<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Minijuegos</title>
    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>
<body class="flex flex-col min-h-screen pt-20">

    
    <x-header />

   
    <div class="flex-grow flex relative"> 

        <div class="flex-shrink-0"> <!-- Este div asegura que el aside no se sobreponga al footer -->
            <!-- Aside (Barra lateral) con desplazamiento y altura controlada -->
            <x-aside id="aside" class="fixed top-20 left-0 w-80 h-full transform -translate-x-full transition-all duration-500 ease-in-out overflow-y-auto z-20 flex flex-col" />
        </div>

      
        <div class="flex-grow w-full h-full p-0"> 
           
            <x-leaderboard />

            <x-game-container>
                @yield('game-content')
            </x-game-container>
        </div>
    </div>

    <x-footer class="mt-auto " /> <!-- Esto asegura que el footer siempre quede al final -->

</body>
</html>
