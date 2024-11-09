<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\GameController;
use App\Http\Controllers\LandingController;

Route::get('/', function () {return view('landing');})->name('landing');
Route::post('/', [LandingController::class, 'store'])->name('landing.store');
Route::post('/games', [GameController::class, 'store'])->name('games.store');

