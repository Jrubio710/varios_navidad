<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\GameController;
use App\Http\Controllers\UserController;

// Ruta a la página de inicio
Route::get('/', function () { return view('games.landing'); })->name('landing');

// Ruta para registrar usuario
Route::post('/store', [UserController::class, 'store'])->name('user.store');

// Ruta para la lista de juegos
Route::get('/games', [GameController::class, 'show'])->name('games.game');

// Ruta para ver un juego específico (cuando haces clic en la imagen del juego)
Route::get('/games/{id}', [GameController::class, 'showGame'])->name('games.show');

// Ruta para jugar un juego específico
Route::get('/games/gameplay/{id}', [GameController::class, 'play'])->name('games.play');
