<?php
$title = 'XMas Game';
?>
<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= $title ?></title>
    <script src="https://cdn.jsdelivr.net/npm/particles.js"></script> 
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
    <style>
       
        #particles-js {
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            z-index: -1;
        }

       
        body {
            background: linear-gradient(to right, #1d4ed8, #3b82f6, #60a5fa); 
            color: white;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        h1 {
            font-family: 'Poppins', sans-serif;
            text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
        }
    </style>
</head>

<body>
    
    <div id="particles-js"></div>
 
    <div class="container mx-auto p-6 text-center mt-32">
        <h1 class="text-4xl md:text-6xl font-extrabold mb-4 animate-pulse"> XMAS GAMES!!!</h1>

        <div id="app" class="bg-white text-black rounded-lg shadow-lg p-6 max-w-md mx-auto">
            <form id="nameForm" name="nameForm" method="POST" action="{{route('user.store')}}" class="space-y-4">
                @csrf
                @if($errors->any())
                <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                    <strong class="font-bold">Error!</strong>
                    <span class="block sm:inline">{{ $errors->first() }}</span>
                </div>
                @endif
                <label for="name" class="block text-lg font-semibold">Nombre:</label>
                <input type="text" name="name" id="name" value="" placeholder="Ingresa tu nombre" 
                    autocomplete="on"
                    class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">

                <button type="submit"
                    class="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-full transition duration-300">
                    Vamo a jugar!
                </button>
            </form>
        </div>
    </div>

    <script>
        
        particlesJS("particles-js", {
            "particles": {
                "number": {
                    "value": 100,
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": "#ffffff"  
                },
                "shape": {
                    "type": "circle",
                    "stroke": {
                        "width": 0,
                        "color": "#000000"
                    }
                },
                "opacity": {
                    "value": 0.5,
                    "random": true,
                    "anim": {
                        "enable": true,
                        "speed": 1,
                        "opacity_min": 0.1,
                        "sync": false
                    }
                },
                "size": {
                    "value": 3,
                    "random": true,
                    "anim": {
                        "enable": true,
                        "speed": 40,
                        "size_min": 0.1,
                        "sync": false
                    }
                },
                "line_linked": {
                    "enable": false
                },
                "move": {
                    "enable": true,
                    "speed": 2,
                    "direction": "bottom",
                    "random": true,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                    "attract": {
                        "enable": false
                    }
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onclick": {
                        "enable": true,
                        "mode": "push"
                    },
                    "resize": true
                }
            },
            "retina_detect": true
        });
    </script>
</body>

</html>
