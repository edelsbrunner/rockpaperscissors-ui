import {Component} from '@angular/core';
import {RockPaperScissorsService} from "./service/rockPaperScissors.service";
import {GameSymbol} from "./resource/GameSymbol";
import {GameResponse} from "./resource/GameResponse";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'rockpaperscissor-ui';
  selectedSymbol: GameSymbol = GameSymbol.ROCK;
  symbolsForUI = GameSymbol;
  gameResponse: GameResponse | undefined;

  constructor(private rockPaperScissorsService: RockPaperScissorsService) {
  }

  sendData() {
    this.rockPaperScissorsService.sendData(this.selectedSymbol).subscribe(
      data => this.gameResponse = data
    );
  }

  selectSymbol(selectedSymbol: GameSymbol) {
    this.selectedSymbol = selectedSymbol
  }

}
