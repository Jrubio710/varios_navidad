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

}