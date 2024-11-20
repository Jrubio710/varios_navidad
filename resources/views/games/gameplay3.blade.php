@extends('games.layout')
@vite(['resources/js/game3.jsx'])

@section('title', 'Juego de Trineos')

<script>
    const gameAssets = {
        trineo: "{{ asset('img/trineo.png') }}",
        regalo: "{{ asset('img/regalo.png') }}",
        arbol: "{{ asset('img/arbol.png') }}",
        nieve: "{{ asset('img/nieve.png') }}",
    };
</script>

@section('game-content')
<div class="content flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-600 to-blue-400">
    <main class="w-full max-w-4xl bg-white rounded-lg shadow-xl p-6 md:p-10 text-center">
        <h1 class="text-3xl font-bold text-blue-800 mb-6">¡Juego de Trineos Navideños!</h1>
        
        <!-- Contenedor del juego con un tamaño adaptativo -->
        <div id="game-container" class="relative w-full h-[500px] bg-gray-800 rounded-lg overflow-hidden">
          
        </div>
     
        <div class="flex justify-center gap-4 mt-6">
            <!-- Botón de inicio/reinicio -->
            <button onclick="startOrRestartGame()" id="start-restart-btn" class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition">Iniciar Juego</button>

            <!-- Botón de instrucciones -->
            <button class="info bg-blue-100 hover:bg-blue-200 text-blue-800 font-medium py-2 px-4 rounded-lg transition flex items-center gap-2 shadow">
                <span class="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center font-bold">i</span>
                Indicaciones
              </button>              
            </button>
        </div>
    </main>
</div>
@endsection