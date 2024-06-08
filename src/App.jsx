import confetti from "canvas-confetti"
import { useEffect, useState } from "react"
import { Square } from "./components/Square"
import { LOCAL_STORAGE, TURNS } from "./utils/constants"
import { checkEndGame, checkWinner } from "./utils/logic"
import { WinnerModal } from "./components/WinnerModal"
import { resetGameStorage, saveGameToStorage } from "./utils/storage"

function App() {
  const [board, setBoard] = useState(() => {
    const boardFromStorage = localStorage.getItem(LOCAL_STORAGE.board)
    return boardFromStorage ? JSON.parse(boardFromStorage) : Array(9).fill(null)
  })
  const [turn, setTurn] = useState(() => {
    const turnFromStorage = localStorage.getItem(LOCAL_STORAGE.turn)
    return turnFromStorage ?? TURNS.X
  })
  const [winner, setWinner] = useState(null) // null (game in progress), false (draw)

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)

    resetGameStorage()
  }

  const updateBoard = (index) => {
    // Verify if cell is blank
    if (board[index] || winner) return
    // Board
    const newBoard = [...board].map((y, idx) => (idx === index ? turn : y))
    setBoard(newBoard)
    // Turn
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

    // Check if winner
    const newWinner = checkWinner(newBoard)
    if (newWinner) {
      confetti()
      setWinner(newWinner)
    } else if (checkEndGame(newBoard)) {
      setWinner(false)
    }
  }

  useEffect(() => {
    saveGameToStorage({ board, turn })
  }, [turn, board])

  return (
    <main className="board">
      <h1>Michi Show</h1>
      <button onClick={resetGame}>Reset</button>
      <section className="game">
        {board.map((_, index) => {
          return (
            <Square key={index} index={index} updateBoard={updateBoard}>
              {board[index]}
            </Square>
          )
        })}
      </section>
      <section className="turn">
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>
      <WinnerModal winner={winner} resetGame={resetGame} />
    </main>
  )
}

export default App
