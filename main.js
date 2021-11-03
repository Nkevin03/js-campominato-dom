const setBtn = document.querySelector('#set-dimension');
const content = document.querySelector('.content')
const dimensionLevel = document.getElementById('dimensions')
let punteggio = 0;
var bool = true;


setBtn.addEventListener('click', () => {
    content.innerHTML = '';

    const container = document.createElement('div')
    container.classList.add ('container')

    content.append(container)

    const grid_dim = dimensionLevel.value;
    let cellsNumber
    let cellPerSide

    switch (grid_dim) {
        case '3':
            cellsNumber = 100;
            cellPerSide = 10;
            break;
        
        case '2':
            cellsNumber = 81;
            cellPerSide = 9;
            break;

        case '1':
            cellsNumber = 49;
            cellPerSide = 7;
            break;
    }

    
    // Gen bombe
    
    function generateBombs(totCells, totBombs) {
        const bombs = [];

        while (bombs.length < totBombs) {
            //  gen numero
            const bomb = getRandNumbert(1, totCells)
            // Controllo numero univoco quindi non presente nella lista bombs
            if (!bombs.includes(bomb)) {
                bombs.push(bomb);
            }
        }
        return bombs;
    }




    const bombList = generateBombs(cellsNumber, 16);
    //console.log('Bombe generate', bombList);

    for (let i = 1; i <= cellsNumber; i++) {
        const square = createGridSquare(i, cellPerSide);
        container.append(square);

        square.addEventListener('click', function() {
            if (bombList.includes(i) && (bool == true)) {
                this.classList.add('bombcolor');
                bool = false;
                container.append(`Hai perso con un punteggio di ${punteggio} punti`)
                
            } else if (bool == true) {
                this.classList.add('active');
                punteggio++
                if (punteggio >= (cellsNumber - 16)) {
                    container.append(`Hai vinto`)
                    bool = false
                }
            } else {

            }
        })
    };

    // Gen numero random

    function getRandNumbert(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }



    function createGridSquare(num, cells) {
        const type = (num % 2 === 0) ? 'even' : 'odd';

 
        const node = document.createElement('div');
        node.classList.add('square', `square-${type}`);
        node.style.width = `calc( 100% / ${cells})`;
        node.style.height = `calc(100% / ${cells})`;
        const span = document.createElement('span');
        span.append(num);
        node.append(span);

        return node;
    }
});

//     $$\   $$\ $$\                           $$\           
//     $$$\  $$ |$$ |                          \__|          
//     $$$$\ $$ |$$ |  $$\  $$$$$$\ $$\    $$\ $$\ $$$$$$$\  
//     $$ $$\$$ |$$ | $$  |$$  __$$\\$$\  $$  |$$ |$$  __$$\ 
//     $$ \$$$$ |$d$$$$  / $$$$$$$$ |\$$\$$  / $$ |$$ |  $$ |
//     $$ |\$$$ |$$  _$$<  $$   ____| \$$$  /  $$ |$$ |  $$ |
//     $$ | \$$ |$$ | \$$\ \$$$$$$$\   \$  /   $$ |$$ |  $$ |
//     \__|  \__|\__|  \__| \_______|   \_/    \__|\__|  \__|