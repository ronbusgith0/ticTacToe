/*----- Constants -----*/

const winningCombos = 
[
[0, 1, 2],
[3, 4, 5],
[6, 7, 8],
[0, 3, 6], 
[1, 4, 7],
[2, 5, 8],
[0, 4, 8],
[2, 4, 6]
];

/*----- App's State (Variables) -----*/

let board;
let turn;
let win;

/*----- Cached Element References -----*/
              
const squares = Array.from(document.querySelectorAll('#board div'));
const messages = document.querySelector('h2');

/*----- Event Listeners -----*/

document.getElementById('board').addEventListener('click', handleTurn);
document.getElementById('reset-button').addEventListener('click', init);

/*----- Functions -----*/

function init()
{
    board = [
                '', '', '',
                '', '', '',
                '', '', ''
            ];
    win = null;
    turn = 'X';
    render();
}

init();

function render()
{
    board.forEach(
        function(mark, index) 
        {
            
            squares[index].textContent = mark;
        }        
                );
                if ( win === 'T' ) 
                {
                    messages.textContent = `That's a tie!`
                } 
                else if (win) 
                { 
                    messages.textContent = `${win} wins the game!`
                } 
                else 
                {
                    messages.textContent = `It's ${turn}'s turn!`
                }
}

function handleTurn(event) 
{
    let i = squares.findIndex(
        function(square) 
        {
            return square === event.target;
        }
                               );
    if((win == null) && (board[i] == '')) 
    {
        board[i] = turn;                       
        if (turn === 'X')
        {
            turn = 'O';
        }
        else 
        {
            turn = 'X';
        }
    }
    
    win = getWinner();
    
    render();
}

function getWinner()
{
    let winner = null;

    winningCombos.forEach(
        function(combo, index)
        {
         if (board[combo[0]] && board[combo[0]] === 
             board[combo[1]] && board[combo[0]] ===
             board[combo[2]]) 
             {
                winner = board[combo[0]];
             }
        }
                         );
    if (winner) 
    {
        return winner 
    } 
    else if (board.includes('')) 
    {
        return null 
    } 
    else 
    {
        return 'T' 
}
}