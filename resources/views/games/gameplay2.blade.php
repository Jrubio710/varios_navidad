@extends('games.layout')
@vite(['resources/js/game2.js'])

@section('title', 'Encuentra al Grinch')

@section('game-content')
<style>
    /* Ocultar scrollbar en todos los navegadores */
    .scrollbar-hide {
        scrollbar-width: none; /* Firefox */
        -ms-overflow-style: none; /* IE y Edge */
    }

    .scrollbar-hide::-webkit-scrollbar {
        display: none; /* Chrome, Safari, Opera */
    }

    /* Estilos para organizar el juego y el rastro a la derecha */
    .game-container {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        gap: 2rem;
    }

    .game-board {
        flex: 1; /* El tablero de juego toma el mayor espacio */
    }

    .rastro-container {
    width: auto; /* Ajusta el tamaño al contenido */
    min-width: 50px; /* Establece un ancho mínimo si es necesario */
    flex-shrink: 0; /* Evita que el contenedor se reduzca */
    display: inline-block; /* Esto permite que el contenedor tome el ancho adecuado basado en su contenido */
}


</style>

<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>

<div class="content flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-600 to-blue-400 p-8">
    <main class="w-full max-w-4xl bg-white rounded-lg shadow-xl p-6 md:p-10 text-center flex flex-col items-center">
        <h1 class="text-3xl font-bold text-blue-800 mb-6">Encuentra al Grinch</h1>

        <!-- Contenedor para el juego y el rastro -->
        <div class="game-container">
            <!-- Tablero de juego -->
            <section class="game-board">
                <div class="flex flex-col items-center">
                    <table class="mx-auto">
                        @for ($i = 0; $i < 4; $i++)
                            <tr class="flex justify-center">
                                @for ($j = 0; $j < 4; $j++)
                                    <td class="p-2">
                                        <button id="{{ "{$i}{$j}" }}"
                                                class="card w-20 h-20 bg-blue-200 rounded-lg transition transform hover:scale-105
                                                disabled:bg-gray-400 disabled:opacity-70"
                                                disabled data-card-value="{{ "{$i}{$j}" }}">
                                        </button>
                                    </td>
                                @endfor
                            </tr>
                        @endfor
                    </table>
                </div>
            </section>

            <!-- Rastro del juego a la derecha -->
            <section class="rastro-container">
                <div id="rastro" class="w-full h-64 bg-gray-100 rounded-lg shadow-inner overflow-y-auto p-2 space-y-2 scrollbar-hide">
                    <!-- Aquí se irán agregando las bolas de colores -->
                </div>
            </section>
        </div>

        <!-- Sección de tiempo y movimientos -->
        <section class="section2 mt-10 w-full flex flex-col items-center">
            <div class="score grid grid-cols-1 gap-4 sm:grid-cols-3">
                <h2 class="tiempo_restante text-lg font-semibold text-gray-800">Tiempo: <span id="tiempo_restante">60</span> segundos</h2>
                <h2 class="movimientos text-lg font-semibold text-gray-800">Movimientos: <span id="contador_movimientos">0</span></h2>
            </div>

            <div class="flex justify-center gap-4 mt-6">
                <button id="iniciar" class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition start">Iniciar Juego</button>
                <button id="reiniciar" class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition restart">Reiniciar Juego</button>
                <button onclick="infoJuego()" class="bg-blue-100 hover:bg-blue-200 text-blue-800 font-medium py-2 px-4 rounded-lg transition flex items-center gap-2 shadow info">
                    <span class="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center font-bold">i</span> Indicaciones
                </button>
            </div>
        </section>
    </main>
</div>

@endsection
