<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Score; // Asegúrate de importar el modelo Score si estás usando este para representar las puntuaciones.
use App\Models\Game; // Asegúrate de importar el modelo Game si estás usando este para representar los juegos.
use App\Models\User; // Asegúrate de importar el modelo User si estás usando este para representar los usuarios.


class ScoreController 
{
    public function guardarPuntuacion(Request $request)
    {
        // Validar los datos recibidos
        $request->validate([
            'score' => 'required|integer',
            'game_id' => 'required|exists:games,id',  // Asegúrate de que el gameId existe en la base de datos
            'user_id' => 'required|exists:users,id',  // Asegúrate de que el userId existe en la base de datos
        ]);

        // Obtener los datos del juego
        $gameId = $request->input('game_id');
        $userId = $request->input('user_id');
        $score = $request->input('score');
   

        // Buscar el juego por ID
        $game = Game::find($gameId);
        $user = User::find($userId);
        

        // Verificar si el juego existe
        if ($game && $user) {
            // Guardar la puntuación (puedes almacenarla en un campo específico de la tabla 'games' o en otra tabla relacionada)
            $scores = new Score();
            $scores->game_id = $gameId;
            $scores->user_id = $userId;
            $scores->score = $score;
            $scores->save();

            // Responder con un mensaje de éxito
            return response()->json(['message' => 'Puntuación guardada con éxito.']);
        }

        // Si el juego no existe, retornar un error
        return response()->json(['error' => 'Juego no encontrado.'], 404);
    }
}
