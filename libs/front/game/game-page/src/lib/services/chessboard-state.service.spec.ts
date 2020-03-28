import { fakeAsync, tick } from '@angular/core/testing';

import { ChessboardStateService } from './chessboard-state.service';
import * as utils from '@chess/shared/chess-utils';
import { GameInfo } from '../model/game-info';
import { GamePieceType, PlayerColor } from '@chess/shared/types';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

describe('ChessboardStateService', () => {
  let service: ChessboardStateService;
  let gameServiceMock: any;

  let gameInfo: GameInfo;

  let selectedCell: string;
  let unsubscribe$: Subject<void>;

  beforeEach(() => {
    gameInfo = ({
      board: {
        d3: { piece: GamePieceType.King, color: PlayerColor.BLACK },
        d4: { piece: GamePieceType.Queen, color: PlayerColor.BLACK },
        g7: { piece: GamePieceType.King, color: PlayerColor.WHITE }
      },
      playAs: PlayerColor.BLACK,
      isMyTurn: true
    } as any) as GameInfo;
  });

  beforeEach(() => {
    selectedCell = undefined;
    unsubscribe$ = new Subject<void>();

    gameServiceMock = { sendMove: jest.fn() };
    service = new ChessboardStateService(gameServiceMock);

    service.selectedCell$
      .pipe(takeUntil(unsubscribe$))
      .subscribe(cell => (selectedCell = cell));

    jest.spyOn(utils, 'isMoveValid').mockReturnValue(false);
  });

  afterEach(() => {
    unsubscribe$.next();
    unsubscribe$.complete();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be default return no selectedCell', () => {
    expect(selectedCell).toBeNull();
  });

  describe('cellClicked function', () => {
    it('should set provided cell as selected if player has to play, and selects his piece', fakeAsync(() => {
      jest.spyOn(utils, 'getPieceOnCell').mockReturnValue(gameInfo.board.d3);

      service.cellClicked('d3', gameInfo);
      tick();

      expect(selectedCell).toBe('d3');
    }));

    const fillSelectedCell = () => {
      jest.spyOn(utils, 'getPieceOnCell').mockReturnValue(gameInfo.board.d3);
      service.cellClicked('d3', gameInfo);
    };

    it('should swap selection if user selects another piece', fakeAsync(() => {
      fillSelectedCell();
      jest.spyOn(utils, 'getPieceOnCell').mockReturnValue(gameInfo.board.d4);

      service.cellClicked('d4', gameInfo);
      tick();

      expect(selectedCell).toBe('d4');
    }));

    it('should empty cell if cell was already provided', fakeAsync(() => {
      jest.spyOn(utils, 'getPieceOnCell').mockReturnValue(gameInfo.board.d3);

      service.cellClicked('d3', gameInfo);
      service.cellClicked('d3', gameInfo);
      tick();

      expect(selectedCell).toBeNull();
    }));

    it('should set empty cell if user clicks on an empty cell', fakeAsync(() => {
      fillSelectedCell();

      jest.spyOn(utils, 'getPieceOnCell').mockReturnValue(null);
      service.cellClicked('b2', gameInfo);
      tick();

      expect(selectedCell).toBeNull();
    }));

    it('should set empty cell if user clicks on a piece of the other color', fakeAsync(() => {
      fillSelectedCell();

      jest.spyOn(utils, 'getPieceOnCell').mockReturnValue(gameInfo.board.g7);
      service.cellClicked('g7', gameInfo);
      tick();

      expect(selectedCell).toBeNull();
    }));

    it('should not selected cell if it is not player turn', fakeAsync(() => {
      gameInfo.isMyTurn = false;
      jest.spyOn(utils, 'getPieceOnCell').mockReturnValue(gameInfo.board.d3);

      service.cellClicked('d3', gameInfo);
      tick();

      expect(selectedCell).toBeNull();
    }));

    it('should send played stroke if move is valid', fakeAsync(() => {
      fillSelectedCell();
      jest.spyOn(utils, 'isMoveValid').mockReturnValue(true);
      jest.spyOn(utils, 'getPieceOnCell').mockReturnValue(null);

      service.cellClicked('e4', gameInfo);
      tick();

      expect(gameServiceMock.sendMove).toHaveBeenCalledWith('d3', 'e4');
    }));
  });
});
