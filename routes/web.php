<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\GameController;
use App\Http\Controllers\UserController;

Route::get('/', function () {return view('landing');})->name('landing');
Route::post('store', [UserController::class, 'store'])->name('store.store');
Route::get('/games', [GameController::class, 'show'])->name('games.show');

