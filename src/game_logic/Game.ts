import {
  Hex,
  LivestockHex,
  TileType,
  LivestockType,
  playerBoardOne,
  type HexSpace,
  keyTiles,
  Worker,
  Dice,
  mainBoard,
  type Depot,
} from '@/game_logic/hex';

export class Box {
  shipSupply: Hex[];
  livestockSupply: LivestockHex[];
  discard: Hex[];

  constructor() {
    this.shipSupply = [new Hex(TileType.Ships)];
    this.livestockSupply = [new LivestockHex(LivestockType.Sheep, 4)];
    this.discard = [];
  }
}

export class Room {
  roomCode: number;
  players: Player[];
  centralBoard: CentralBoard;

  constructor(roomCode: number) {
    this.roomCode = roomCode;
    this.players = [new Player(0), new Player(1)];
    this.centralBoard = new CentralBoard();
  }
}

class Player {
  board: PlayerBoard;
  playerNumber: number;

  constructor(playerID: number) {
    this.board = new PlayerBoard();
    this.playerNumber = playerID;
  }
}

class PlayerBoard {
  duchy: (HexSpace | null)[][];
  keyTiles: (Hex | null)[];
  dice: Dice;
  workers: Worker;

  constructor() {
    this.duchy = playerBoardOne;
    this.keyTiles = keyTiles;
    this.dice = new Dice();
    this.workers = new Worker();
  }
}

export class CentralBoard {
  outerBoard: Depot[];
  blackTiles: (Hex | null)[];
  phaseTracker: (Hex | null)[][];
  currPhase: (Hex | null)[];

  constructor() {
    this.outerBoard = mainBoard;
    this.blackTiles = [];
    this.phaseTracker = [[]];
    this.currPhase = [];
  }
}
