@extends('games.layout')
@vite(['resources/js/game2.js'])

@section('title', 'Encuentra al Grinch')

@section('game-content')
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
<div class="content flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-600 to-blue-400 p-8">
    <main class="w-full max-w-3xl bg-white rounded-lg shadow-xl p-6 md:p-10 text-center">
        <section class="section1">
            <h1 class="text-3xl font-bold text-blue-800 mb-6">Encuentra al Grinch</h1>
            <table class="w-full mx-auto">
                @for ($i = 0; $i < 4; $i++)
                <tr class="flex justify-center">
                    @for ($j = 0; $j < 4; $j++)
                        <td class="p-2">
                            <button id="{{ $i . $j }}"
                            class="card w-20 h-20 bg-blue-200 rounded-lg transition transform hover:scale-105
                                   disabled:bg-gray-400 disabled:opacity-70"
                            disabled
                            data-card-value="{{ $i . $j }}">
                            </button>
                        </td>
                    @endfor
                </tr>
                @endfor
            </table>
        </section>
        
        <section class="section2 mt-10">
            <div class="score grid grid-cols-1 gap-4 sm:grid-cols-3">
                <h2 class="tiempo_restante text-lg font-semibold text-gray-800">Tiempo: <span id="tiempo_restante">60</span> segundos</h2>
                <h2 class="movimientos text-lg font-semibold text-gray-800">Movimientos: <span id="contador_movimientos">0</span></h2>
            </div>
            <div class="flex justify-center gap-4 mt-6">
                <button id="iniciar" class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition start">Iniciar Juego</button>
                <button onclick="reiniciarJuego()" class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition restart">Reiniciar Juego</button>
            </div>
        </section>
    </main>
</div>
@endsection
