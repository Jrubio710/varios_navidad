<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Game extends Model
{
    use HasFactory;

    // Si la tabla en la base de datos tiene un nombre diferente, especificarlo aquí
    protected $table = 'games';

    // Agrega los campos que deseas que se llenen de forma masiva
    protected $fillable = ['title', 'description'];
}
