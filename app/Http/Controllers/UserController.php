<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class UserController
{
    
function store(Request $request)
{
    $request->validate([
        'name' => 'required',
    ]);
    
    $user = new User();
    $user->name = $request->name;
    $user->ip = $request->ip();
    
    if($user == User::where('ip','=',  $request->ip())){
        session(['user'=>$user]);
    }else{
        $user->save();
        session(['user'=>$user]);    
    }
    return redirect('/games');
}

public function store1(Request $request)
{
    $request->validate([
        'name' => 'required|string|max:255',
    ]);

    $existingUser = User::where('ip', $request->ip())->first();

    if ($existingUser) {
        session(['user' => $existingUser]);
    } else {
        $user = new User();
        $user->name = $request->name;
        $user->ip = $request->ip();
        $user->save();

        session(['user' => $user]); 
        
    }

    // Redirigir a la página principal de juegos
    return redirect()->route('games.game');
}


}