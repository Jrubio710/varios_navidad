<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Página Principal de Actividades</title>
    @vite(['resources/css/app.css', 'resources/js/app.js'])
    <script src="https://cdn.jsdelivr.net/npm/particles.js"></script> 
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
            color: white; 
        }
    </style>
</head>
<body class="bg-gray-100">

    
    <div id="particles-js"></div>

    <header class="bg-blue-500 text-white p-4 fixed top-0 left-0 w-full z-10 shadow-lg">
        <div class="container mx-auto flex justify-between items-center">
            <a href="{{ route('games.game') }}" 
               class="text-2xl font-semibold px-4 py-2 rounded-lg bg-gradient-to-r from-blue-400 to-blue-600 shadow-md transition duration-300 transform hover:scale-105 hover:from-blue-500 hover:to-blue-700 hover:shadow-lg">
                X-MASS GAMES
            </a>
        </div>
    </header>
    
    <div class="main-layout pt-24"> 
        
        <h1 class="text-4xl text-center font-bold mb-12">Escoge una Actividad Navideña</h1>

        <div class="games-container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
            @foreach($games as $game)
                <div class="game-card bg-white text-gray-800 rounded-lg shadow-lg hover:shadow-2xl transition-all p-6 flex flex-col justify-between">
                    <h2 class="text-2xl font-bold text-center text-gray-900 mb-4">{{ $game->name }}</h2>
                    
                    <div class="w-full h-48 relative mb-4">
                        <img src="{{ asset('img/juego' . $game->id . '.png') }}" alt="{{ $game->name }}" class="w-full h-full object-contain rounded-md">
                    </div>
                    
                    <p class="text-center text-gray-600 mb-6">{{ $game->description }}</p>
                    
                    <div class="flex-grow"></div> 
                    <button class="play-button bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold py-3 px-8 rounded-full hover:bg-gradient-to-l hover:from-blue-500 hover:to-teal-500 transition-all duration-300 transform hover:scale-105 mx-auto" id="{{$game->id}}" onclick="window.location.href='{{ route('games.play', $game->id) }}'">
                        Jugar
                    </button>
                </div>
            @endforeach
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
