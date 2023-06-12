import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GameResponse} from "../resource/GameResponse";
import {GameSymbol} from "../resource/GameSymbol";
import {GameRequest} from "../resource/GameRequest";
import {catchError, Observable} from "rxjs";

@Injectable()
export class RockPaperScissorsService {

  constructor(private httpClient: HttpClient) {
  }

  sendData(selectedSymbol: GameSymbol): Observable<GameResponse> {
    const gameRequest: GameRequest = {
      playerSymbol: selectedSymbol
    }

    return this.httpClient.post<GameResponse>('http://localhost:8080' + '/v1/game', gameRequest, {}).pipe(
      catchError(error => {
        console.log('An error occurred in the call to the service:', error);
        throw error;
      })
    )
  }
}
