<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Score extends Model
{
    use HasFactory;

    // Especificamos los campos que se pueden llenar en la base de datos
    protected $fillable = ['user_id', 'game_id', 'score'];

    // Relación con el modelo User (asumiendo que tienes un modelo User)
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Relación con el modelo Game (si lo tienes)
    public function game()
    {
        return $this->belongsTo(Game::class);
    }
}
