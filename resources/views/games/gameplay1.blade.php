@extends('games.layout')

@section('title', 'Juego de Memoria')

@section('game-content')
<div class="game-container">
    <!-- Aquí iría el código específico del juego de memoria -->
    <p>Este es el juego de memoria</p>
</div>
@endsection
@php
    app('App\Http\Controllers\GrinchController')->index();
@endphp
