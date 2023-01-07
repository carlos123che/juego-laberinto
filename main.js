const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');
const btnUp = document.querySelector('#up');
const btnDown = document.querySelector('#down');
const btnLeft = document.querySelector('#left');
const btnRight = document.querySelector('#right');

const playerPosition = {
    x: undefined,
    y: undefined
};



let canvasSize;
let elementsSize;
window.addEventListener('load', setCanvasSize);
window.addEventListener('resize', setCanvasSize);



function startGame() {

    const cantidadElementos = 10;

    const noMapa = 0; //nivel
    const gamemap = maps[noMapa];
    const mapRows = gamemap.trim().split('\n'); // separar las filas por salto de linea y eliminar espacios vacios.
    const mapRowCols = mapRows.map(row => row.trim().split('')); //la variable row es cada una de las filas (cada posición del arreglo) y el .split('') nos separa caracter por caracter y cadap posicion del arreglo sera un arreglo.

    game.font = elementsSize + 'px Verdana';
    game.textAlign = 'end';

    game.clearRect(0, 0, canvasSize, canvasSize);

    mapRowCols.forEach((row, rowIndex) => {
        row.forEach((column, columnIndex) => {
            const emoji = emojis[column];
            const posX = elementsSize * (rowIndex + 1);
            const posY = elementsSize * (columnIndex + 1);

            if (playerPosition.x == undefined && playerPosition.y == undefined && column == 'O') {
                playerPosition.x = posX;
                playerPosition['y'] = posY;
            }

            game.fillText(emoji, posX + 10
                , posY);
        });
    });


    movePlayer();

    // for (let j = 1; j < cantidadElementos + 1; j++) {
    //     for (let i = 1; i < cantidadElementos + 1 ; i++) {
    //         game.fillText(emojis[mapRowCols[j-1][i-1]], (elementsSize* i) + 10, (elementsSize*j));
    //     }

    // }

}

function setCanvasSize() {
    if (window.innerHeight > window.innerWidth) {
        canvasSize = window.innerWidth * 0.75;
    } else {
        canvasSize = window.innerHeight * 0.75;
    }

    canvas.setAttribute('width', canvasSize);
    canvas.setAttribute('height', canvasSize);

    elementsSize = canvasSize / 10.5;

    startGame();
}
// eventos de movimiento
btnUp.addEventListener('click', moveUp);
btnDown.addEventListener('click', moveDown);
btnLeft.addEventListener('click', moveLeft);
btnRight.addEventListener('click', moveRight);
//teclas
window.addEventListener('keydown', moveByKey);


function moveUp() {

    if (playerPosition.y - elementsSize > 5) {
        playerPosition.y -= elementsSize;
        startGame();
    }
}

function moveDown() {

    if (playerPosition.y + elementsSize < canvasSize) {
        playerPosition.y += elementsSize;
        startGame();
    }
}

function moveLeft() {

    if (playerPosition.x - elementsSize > 0) {
        playerPosition.x -= elementsSize;
        startGame();
    }
}

function moveRight() {

    if (playerPosition.x + elementsSize < canvasSize) {
        playerPosition.x += elementsSize;
        startGame();
    }
}

function moveByKey(event) {

    if (event.key == 'ArrowUp') {
        moveUp();
    } else if (event.key == 'ArrowDown') {
        moveDown();
    } else if (event.key == 'ArrowLeft') {
        moveLeft();
    } else if (event.key == 'ArrowRight') {
        moveRight();
    }

}

function movePlayer() {
    game.font = elementsSize - 2 + 'px Verdana';
    game.fillText(emojis['PLAYER'], playerPosition.x + 7.5, playerPosition.y);
}