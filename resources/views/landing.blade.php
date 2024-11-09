<?php
$title = 'XMas Game';
?>
<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= $title ?></title>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
</head>

<body class="bg-gradient-to-r from-blue-900 via-purple-800 to-pink-700 min-h-screen flex items-center justify-center text-white">
    <div class="container mx-auto p-6 text-center">
        <h1 class="text-4xl md:text-6xl font-extrabold mb-4 animate-pulse"> XMAS GAME!!!</h1>

        <div id="app" class="bg-white text-black rounded-lg shadow-lg p-6 max-w-md mx-auto">
            <form id="nameForm" name="nameForm" method="GET" action="{{ url('/check') }}" class="space-y-4">
                @csrf
                <label for="name" class="block text-lg font-semibold">Nombre:</label>
                <input type="hidden" name="_token" value="{{ csrf_token() }}">
                <input type="text" name="name" id="name" value="" placeholder="{{ session('user_name') }}"
                    autocomplete="on"
                    class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">

                <button type="submit"
                    class="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-full transition duration-300">
                    Vamo a jugar!
                </button>
            </form>
        </div>
    </div>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
</body>
<script>
function checkName(){
    $.ajax({
    url:"/",
    type:"POST",
    data:$("#name").serialize(),success:function(result){console.log(result);
    
    }});}
</script>
</html>