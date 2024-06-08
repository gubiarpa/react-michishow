import { LOCAL_STORAGE } from "./constants"

export const saveGameToStorage = ({ board, turn }) => {
  localStorage.setItem(LOCAL_STORAGE.board, JSON.stringify(board))
  localStorage.setItem(LOCAL_STORAGE.turn, turn)
}

export const resetGameStorage = () => {
  localStorage.removeItem(LOCAL_STORAGE.board)
  localStorage.removeItem(LOCAL_STORAGE.turn)
}
