<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\GameController;
use App\Http\Controllers\UserController;


Route::get('/', function () {return view('games.landing'); })->name('landing');


Route::post('/store', [UserController::class, 'store'])->name('user.store');

Route::get('/games', [GameController::class, 'show'])->name('games.game');

Route::get('/gamesList', [GameController::class, 'gamesList'])->name('games.index');
