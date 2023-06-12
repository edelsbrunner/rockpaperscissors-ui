import {GameResult} from "./GameResult";
import {GameSymbol} from "./GameSymbol";

export type GameResponse = {
  result: GameResult,
  opponentSymbol: GameSymbol,
}
