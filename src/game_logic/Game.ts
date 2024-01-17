import {
  Hex,
  LivestockHex,
  BuildingHex,
  KnowledgeHex,
  TileType,
  LivestockType,
  playerBoardOne,
  type HexSpace,
  keyTiles,
  Dice,
  mainBoard,
  type Depot,
  BuildingType,
} from '@/game_logic/hex';

export class Box {
  shipSupply: Hex[];
  livestockSupply: LivestockHex[];
  buildingSupply: BuildingHex[];
  castleSupply: Hex[];
  mineSupply: Hex[];
  knowledgeSupply: KnowledgeHex[];
  blackSupply: Hex[];
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
    ];
    this.livestockSupply = [new LivestockHex(LivestockType.Sheep, 4), new LivestockHex(LivestockType.Sheep, 3)];
    this.buildingSupply = [
      new BuildingHex(BuildingType.Watchtower),
      new BuildingHex(BuildingType.Bank),
      new BuildingHex(BuildingType.BoardingHouse),
      new BuildingHex(BuildingType.Church),
    ];
    this.castleSupply = [new Hex(TileType.Castles), new Hex(TileType.Castles), new Hex(TileType.Castles)];
    this.mineSupply = [
      new Hex(TileType.Mines),
      new Hex(TileType.Mines),
      new Hex(TileType.Mines),
      new Hex(TileType.Mines),
    ];
    this.knowledgeSupply = [
      new KnowledgeHex(1),
      new KnowledgeHex(2),
      new KnowledgeHex(3),
      new KnowledgeHex(4),
      new KnowledgeHex(5),
    ];
    this.blackSupply = [
      new Hex(TileType.Ships, true),
      new Hex(TileType.Ships, true),
      new Hex(TileType.Ships, true),
      new Hex(TileType.Ships, true),
      new Hex(TileType.Ships, true),
      new Hex(TileType.Ships, true),
    ];
    this.discard = [];
  }
}

export class Room {
  roomCode: string;
  players: Player[];
  centralBoard: CentralBoard;
  box: Box;

  constructor(roomCode: string, playerId: string) {
    this.roomCode = roomCode;
    this.players = [new Player(playerId)];
    this.centralBoard = new CentralBoard();
    this.box = new Box();
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
  keyTiles: (HexSpace | null)[];
  dice: Dice[];
  workers: number;
  silverlings: number;
  goods: (Hex | null)[];

  constructor() {
    this.duchy = playerBoardOne;
    this.keyTiles = keyTiles;
    this.dice = [new Dice(), new Dice()];
    this.workers = 0;
    this.silverlings = 1;
    this.goods = [];
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
