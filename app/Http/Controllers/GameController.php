<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Game;

class GameController
{
    public function show(Request $request)
    {
        // Verificar si el usuario está en la sesión
        if (!$request->session()->has('user')) {
            return redirect()->route('landing');
        }

        // Obtener todos los juegos desde la base de datos
        $games = Game::all();

        // Pasar la variable $games a la vista
        return view('games.game', ['games' => $games]);
    }

    public function gamesList()
    {
        $games = Game::all();
        return view('games.index', ['games' => $games]);
    }

}
