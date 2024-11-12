<?php
$board = session('board');
$grinchPositionX = session('x');
$grinchPositionY = session('y');
$chances = 10;

?>
<div id="gameboard" class="grid gap-1 w-full h-full" style="grid-template-columns: repeat(<?= count($board) ?>, 25%);">
    @foreach ($board as $row)
        @foreach ($row as $index => $color)
            <!--<div id="cell-{{ $loop->parent->index }}-{{ $index }}" class="color-cell w-full h-full p-4"
                style="background-color: <?= $color['hex'] ?>;"
                onclick="checkCell({{ $loop->parent->index }}, {{ $index }})">
            </div>-->
            <div id="cell-{{ $loop->parent->index }}-{{ $index }}" class="color-cell w-full h-full p-4"
                style="background-color: <?= $color['hex'] ?>;"
                onclick="moverGrinch()"><button class="btn" id="btn">Mover Grinch</button>
            </div>
        @endforeach
    @endforeach
</div>
