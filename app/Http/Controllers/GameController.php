<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Game;

class GameController
{
    public function show()
    {

        $games = Game::all();

        return view('games.game', compact('games'));
    }

    public function play($id)
    {
        if (session()->has('user')) {


            $viewPath = 'games.gameplay' . $id;

            if (view()->exists($viewPath)) {
                return view($viewPath);
            } else {
                abort(404, 'El juego solicitado no existe.');
            }
        }else{
            return redirect()->route('landing');
        }
    }
}