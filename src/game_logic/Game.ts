import {
  Hex,
  LivestockHex,
  type BuildingHex,
  type KnowledgeHex,
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
  buildingSupply: BuildingHex[];
  castleSupply: Hex[];
  mineSupply: Hex[];
  knowledgeSupply: KnowledgeHex[];
  discard: Hex[];

  constructor() {
    this.shipSupply = [
      new Hex(TileType.Ships),
      new Hex(TileType.Ships),
      new Hex(TileType.Ships),
      new Hex(TileType.Ships),
      new Hex(TileType.Ships),
      new Hex(TileType.Ships),
      new Hex(TileType.Ships),
      new Hex(TileType.Ships),
      new Hex(TileType.Ships),
      new Hex(TileType.Ships),
      new Hex(TileType.Ships),
      new Hex(TileType.Ships),
      new Hex(TileType.Ships),
      new Hex(TileType.Ships),
      new Hex(TileType.Ships),
      new Hex(TileType.Ships),
      new Hex(TileType.Ships),
      new Hex(TileType.Ships),
      new Hex(TileType.Ships),
      new Hex(TileType.Ships),
      new Hex(TileType.Ships, true),
      new Hex(TileType.Ships, true),
      new Hex(TileType.Ships, true),
      new Hex(TileType.Ships, true),
      new Hex(TileType.Ships, true),
      new Hex(TileType.Ships, true),
    ];
    this.livestockSupply = [new LivestockHex(LivestockType.Sheep, 4)];
    this.buildingSupply = [];
    this.castleSupply = [];
    this.mineSupply = [];
    this.knowledgeSupply = [];
    this.discard = [];
  }
}

export class Room {
  roomCode: string;
  players: Player[];
  centralBoard: CentralBoard;

  constructor(roomCode: string, firstPlayerId: string) {
    this.roomCode = roomCode;
    this.players = [new Player(firstPlayerId)];
    this.centralBoard = new CentralBoard();
  }
}

export class Player {
  board: PlayerBoard;
  playerId: string;
  points: number;

  constructor(playerID: string) {
    this.board = new PlayerBoard();
    this.playerId = playerID;
    this.points = 0;
  }
}

class PlayerBoard {
  duchy: (HexSpace | null)[][];
  keyTiles: (Hex | null)[];
  dice: Dice;
  workers: Worker;
  silverlings: number;

  constructor() {
    this.duchy = playerBoardOne;
    this.keyTiles = keyTiles;
    this.dice = new Dice();
    this.workers = new Worker();
    this.silverlings = 1;
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
