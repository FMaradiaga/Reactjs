import { WINNWER_COMBOS } from "../constants/constants";
export const chekWinnerFrom = (boardToCheck) => {
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
export const chekEndGame = (newBoard) => {
    return newBoard.every((square) => square !== null)
}