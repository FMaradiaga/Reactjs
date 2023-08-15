import { useState } from 'react'
import confetti from "canvas-confetti"
import { Square } from './component/Square'
import { TURNS } from './constants/constants'
import { chekWinnerFrom, chekEndGame } from "./logic/board"
import { WinnerModal } from './component/WinnerModal'
import { TableSquare } from './component/TableSquare'
import './App.css'



function App() {
  const [board, SetBoard] = useState(
    () => {
      const boardFromStorage = window.localStorage.getItem('board')
      return boardFromStorage ? JSON.parse(boardFromStorage) : Array(9).fill(null)
    }

  )
  const [turn, setTurn] = useState(
    () => {
      const turnFromStorage = window.localStorage.getItem('turn')
      // validar si tiene info o esta undefine
      return turnFromStorage ?? TURNS.x
    }
  )
  //null es porque no hay ganador y el false es porque hay un empate
  const [winner, setWinner] = useState(null)

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
    //guardar aqui partida
    window.localStorage.setItem('board', JSON.stringify(newBoard))
    window.localStorage.setItem('turn', newTurn)
    //revizar si hay un ganador
    const newWinner = chekWinnerFrom(newBoard)
    if (newWinner) {
      confetti()
      setWinner(newWinner)
    } else if (chekEndGame(newBoard)) {
      setWinner(false)
    }
  }

  const resetGame = () => {
    SetBoard(Array(9).fill(null))
    setTurn(TURNS.x)
    setWinner(null)
    window.localStorage.removeItem('board');
    window.localStorage.removeItem('turn');
  }

  return (
    <main className='board'>
      <h1>TIC TAC TO</h1>
      <button onClick={resetGame}>Reset del Juego</button>
      <TableSquare board={board} updateBoard={updateBoard} ></TableSquare>

      <section className='turn'>
        <Square isSelected={turn === TURNS.x}>
          {TURNS.x}
        </Square>
        <Square isSelected={turn === TURNS.o}>
          {TURNS.o}
        </Square>
      </section>

      <WinnerModal resetGame={resetGame} winner={winner}></WinnerModal>
    </main>

  )
}

export default App
