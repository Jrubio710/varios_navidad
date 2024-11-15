<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class GrinchController
{
    public function show()
    {
        //verificar si el usuario está en la sesión y devolver la vista
        return view('games.grinch');
    }

    public function play()
    {
        return view('games.grinchplay');
    }

    public function saveScore() {
        //guardar el puntaje del usuario en la base de datos

        return response()->json([
            'result' => 'success',
            'message' => 'Puntaje guardado'
        ]);

    }
}
