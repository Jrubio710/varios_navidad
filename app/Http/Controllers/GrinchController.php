<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class GrinchController
{
    public function index(){
        $this->createBoard();
    }
    public function show()
    {
        //verificar si el usuario está en la sesión y devolver la vista
        return view('games.grinch');
    }
    public function createBoard($size = 4)
    {
        $grinchController = new GrinchController();
        $color = $this->colors($size);

        if ($size < 3) {
            $size = 3;
        }
        $grinch = $grinchController->firstPositionGrinch($size);
        $board = [];

        for ($i = 0; $i < $size; $i++) {
            $board[$i] = [];
            for ($j = 0; $j < $size; $j++) {
                $board[$i][$j] = $this->getRandomColor($color);
            }
        }
        session(['chances' => 10]);
        session(['board' => $board]);
        session('size', $size);
        return 200;
    }
    public function firstPositionGrinch($size)
    {
        $grinchPosition_y = rand(0, $size - 1);
        $grinchPosition_x = rand(0, $size - 1);

        session(['x' => $grinchPosition_x]);
        session(['y' => $grinchPosition_y]);

        return ['x' => $grinchPosition_x, 'y' => $grinchPosition_y];
    }
    public function checkCell() {
        //verifica si el mounstro está en la celda clickada


        return response()->json([
            'result' => 'success',
            'message' => 'El mounstro está en la celda clickada'
        ]);
    }
    public function colors($size = 3){
        $colors = [
            "#39FF14",
            "#FF073A",
            "#0FF0FC",
            "#F800FF",
            "#FFEF00",
            "#FF00FF",
            "#FF5F1F",
            "#6FFF00",
            "#00FFFF",
            "#FF1493",
            "#CCFF00",
            "#8F00FF",
            "#FF6EC7",
            "#01F9C6",
            "#F4F92A",
            "#FF66FF",
            "#33FFCC",
            "#FF007F",
            "#DFFF00",
            "#00FF7F"
        ];

        $colors = array_rand($colors, $size);
        return $colors;
    }
    public function getRandomColor($colors){

        $randomColor = $colors[rand(0, count($colors) - 1)];
        return $randomColor;
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