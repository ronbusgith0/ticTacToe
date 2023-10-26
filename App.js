function App() {
    /*----- constants -----*/
    const winningCombos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    /*----- app's state (variables) -----*/
    const [board, setBoard] = React.useState(["","","","","","","","","",]);
    const [turn, setTurn] = React.useState("X");
    const [message, setMessage] = React.useState(`It's ${turn}'s turn!`);
    const [elementColor, setelementColor] = React.useState("black");
    const [borderColors, setBorderColors] = React.useState(
      Array(9).fill("white")
    );
    const [buttonColor, setButtonColor] = React.useState("yellow");
    const [gameOver, setGameOver] = React.useState(false);
    const [win, setWin] = React.useState(null);
  
    React.useEffect(() => {
      let winner = getWinner();
      setWin(winner);
    }, [board]);
  
    function handleTurn(event) {
      if (gameOver) return;
      let idx = event.target.id;
      let newBoard = [...board];
  
      if (win || newBoard[idx] !== "") {
        return;
      }
      newBoard[idx] = turn;
  
      setBoard(newBoard);
  
      setTurn(newBoard[idx] === "X" ? "O" : "X");
    }
    React.useEffect(() => {
      let winner = getWinner();
      setWin(winner);
  
      let newMessage = "";
      if (winner === "T") {
        newMessage = `That's a tie!`;
        setGameOver(true);
      } else if (winner) {
        newMessage = `${winner} wins the game!`;
        setGameOver(true);
      } else {
        newMessage = `It's ${turn}'s turn!`;
      }
  
      setMessage(newMessage);
    }, [board]);
    
    function handleReset() {
      setBoard(["", "", "", "", "", "", "", "", ""]);
      setGameOver(false);
    }
  
    function getWinner() {
      // just stub it up for now.
      let winner = null;
      winningCombos.forEach(function (combo, idx) {
        if (
          board[combo[0]] &&
          board[combo[0]] === board[combo[1]] &&
          board[combo[0]] === board[combo[2]]
        )
          winner = board[combo[0]];
      });
  
      return winner ? winner : board.includes("") ? null : "T";
    }
    function getRandomColor() {
      return "#" + Math.floor(Math.random() * 16777215).toString(16);
    }
    React.useEffect(() => {
      const colorInterval = setInterval(() => {
        setelementColor((prevColor) => (prevColor === "purple" ? "gold" : "purple"));
      }, 500);
      return () => clearInterval(colorInterval);
    }, []);
  
    React.useEffect(() => {
      const buttonColorInterval = setInterval(() => {
        setButtonColor((prevColor) =>
          prevColor === "purple" ? "gold" : "purple"
        );
      }, 500);
  
      return () => clearInterval(buttonColorInterval);
    }, []);
  
    React.useEffect(() => {
      const borderColorInterval = setInterval(() => {
        setBorderColors(borderColors.map(() => getRandomColor()));
      }, 500);
  
      return () => clearInterval(borderColorInterval);
    }, []);
    return (
      <div>
        <h1 style={{ color: "skyblue" }}>Tic-Tac-Toe</h1>
  
        <h2 style={{ color: elementColor }}>{message}</h2>
  
        <div class="flex-container flex-column">
          <div class="flex-container flex-wrap" id="board" onClick={handleTurn}>
            {board.map((value, idx) => {
              return (
                <div
                  class="square"
                  key={idx}
                  id={idx}
                  style={{
                    color: value === "X" ? "red" : "blue",
                    borderColor: borderColors[idx],
                  }}
                >
                  {value}
                </div>
              );
            })}
          </div>
  
          <button
            id="reset-button"
            onClick={handleReset}
            style={{ color: buttonColor }}
          >
            Reset
          </button>
        </div>
      </div>
    );
  }
  
  ReactDOM.render(<App />, root);