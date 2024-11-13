@vite(['resources/css/app.css', 'resources/js/app.js'])
<header class="bg-blue-500 text-white p-4 fixed top-0 left-0 w-full z-10 shadow-lg">
    <div class="container mx-auto flex justify-between items-center">
        <a href="{{ route('games.game') }}" 
           class="text-2xl font-semibold px-4 py-2 rounded-lg bg-gradient-to-r from-blue-400 to-blue-600 shadow-md transition duration-300 transform hover:scale-105 hover:from-blue-500 hover:to-blue-700 hover:shadow-lg">
            X-MASS GAMES
        </a>
    </div>
</header>
