import { useState } from 'react'
import './App.css'

const TURNS = {
  x: 'x',
  o: 'o'
}


const Square = ({ children, isSelected, updateBoard, index }) => {
  const className = `square ${isSelected ? 'is-selected' : ''}`
  const handleClick = () => {
    updateBoard(index)
  }

  return (
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  )

}

const WINNWER_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]



function App() {
  const [board, SetBoard] = useState(Array(9).fill(null))
  const [turn, setTurn] = useState(TURNS.x)
  //null es porque no hay ganador y el false es porque hay un empate
  const [winner, setWinner] = useState(null)
  const chekWinner = (boardToCheck) => {
    //revisamos si hay ganador
    //para ver si X u O gano
    for (const combo of WINNWER_COMBOS) {
      const [a, b, c] = combo
      if (boardToCheck[a] && boardToCheck[a] === boardToCheck[b] && boardToCheck[a] === boardToCheck[c]) {
        return boardToCheck[a]
      }
    }
    //Si no hay Ganador
    return null

  }
  const chekEndGame = (newBoard) => {
    return
  }
  const updateBoard = (index) => {
    //No actualizamos esta posicion
    //si ya tiene algo
    if (board[index] || winner) return
    //Actualizar el tableor
    const newBoard = [...board]
    newBoard[index] = turn
    SetBoard(newBoard)
    //Cambiar el turno
    const newTurn = turn === TURNS.x ? TURNS.o : TURNS.x
    setTurn(newTurn)
    //revizar si hay un ganador
    const newWinner = chekWinner(newBoard)
    if (newWinner) {
      setWinner(newWinner)
    } else if (chekEndGame(newBoard)) {
      setWinner(false)
    }
  }

  const resetGame = () => {
    SetBoard(Array(9).fill(null))
    setTurn(TURNS.x)
    setWinner(null)
  }

  return (
    <main className='board'>
      <h1>TIC TAC TO</h1>
      <button onClick={resetGame}>Reset del Juego</button>
      <section className="game">
        {
          board.map((_, index) => {
            return (
              <Square
                key={index}
                index={index}
                updateBoard={updateBoard}
              >
                {board[index]}
              </Square>
            )
          }
          )
        }
      </section>

      <section className='turn'>
        <Square isSelected={turn === TURNS.x}>
          {TURNS.x}
        </Square>
        <Square isSelected={turn === TURNS.o}>
          {TURNS.o}
        </Square>
      </section>


      {
        winner != null && (
          <section className='winner'>
            <div className='text'>
              <h2>
                {
                  winner === false
                    ? 'Empate'
                    : `Ganador:`
                }
              </h2>
              <header className='win'>
                {winner && <Square>{winner}</Square>}
              </header>
              <footer>
                <button onClick={resetGame}>Empezar de Nuevo</button>
              </footer>
            </div>
          </section>
        )
      }
    </main>

  )
}

export default App
