import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {GameSymbol} from '../resource/GameSymbol';
import {GameRequest} from '../resource/GameRequest';
import {GameResponse} from '../resource/GameResponse';
import {RockPaperScissorsService} from "./rockPaperScissors.service";
import {GameResult} from "../resource/GameResult";

describe('RockPaperScissorsService', () => {
  let service: RockPaperScissorsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RockPaperScissorsService]
    });

    service = TestBed.inject(RockPaperScissorsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should send data and return game response', () => {
    const selectedSymbol: GameSymbol = GameSymbol.ROCK;
    const gameRequest: GameRequest = { playerSymbol: selectedSymbol };
    const expectedResponse: GameResponse = { result: GameResult.VICTORY, opponentSymbol: GameSymbol.SCISSORS };

    service.sendData(selectedSymbol).subscribe((response: GameResponse) => {
      expect(response).toEqual(expectedResponse);
    });

    const request = httpMock.expectOne('http://localhost:8080/v1/game');
    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual(gameRequest);

    request.flush(expectedResponse);
  });

  it('should handle error and re-throw', () => {
    const selectedSymbol: GameSymbol = GameSymbol.ROCK;

    service.sendData(selectedSymbol).subscribe(
      () => {},
      (error) => {
        expect(error).toBeDefined();
      }
    );

    const request = httpMock.expectOne('http://localhost:8080/v1/game');
    expect(request.request.method).toBe('POST');

    request.error(new ErrorEvent('network error'));
  });
});
