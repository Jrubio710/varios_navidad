<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class UserController
{
public function store(Request $request)
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
    return redirect('/games');
}


}