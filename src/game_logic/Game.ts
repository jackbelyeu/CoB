import {
  Hex,
  LivestockHex,
  BuildingHex,
  KnowledgeHex,
  TileType,
  LivestockType,
  HexSpace,
  BuildingType,
} from '@/game_logic/Hex';

class Box {
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
    this.livestockSupply = [
      new LivestockHex(LivestockType.Sheep, 4),
      new LivestockHex(LivestockType.Sheep, 3),
      new LivestockHex(LivestockType.Cows, 4),
      new LivestockHex(LivestockType.Cows, 3),
      new LivestockHex(LivestockType.Chickens, 4),
      new LivestockHex(LivestockType.Chickens, 3),
    ];
    this.buildingSupply = [
      new BuildingHex(BuildingType.Watchtower),
      new BuildingHex(BuildingType.Bank),
      new BuildingHex(BuildingType.BoardingHouse),
      new BuildingHex(BuildingType.Church),
      new BuildingHex(BuildingType.Workshop),
      new BuildingHex(BuildingType.Market),
      new BuildingHex(BuildingType.TownHall),
      new BuildingHex(BuildingType.Warehouse),
      new BuildingHex(BuildingType.Watchtower),
      new BuildingHex(BuildingType.Bank),
      new BuildingHex(BuildingType.BoardingHouse),
      new BuildingHex(BuildingType.Church),
      new BuildingHex(BuildingType.Workshop),
      new BuildingHex(BuildingType.Market),
      new BuildingHex(BuildingType.TownHall),
      new BuildingHex(BuildingType.Warehouse),
      new BuildingHex(BuildingType.Watchtower),
      new BuildingHex(BuildingType.Bank),
      new BuildingHex(BuildingType.BoardingHouse),
      new BuildingHex(BuildingType.Church),
      new BuildingHex(BuildingType.Workshop),
      new BuildingHex(BuildingType.Market),
      new BuildingHex(BuildingType.TownHall),
      new BuildingHex(BuildingType.Warehouse),
      new BuildingHex(BuildingType.Watchtower),
      new BuildingHex(BuildingType.Bank),
      new BuildingHex(BuildingType.BoardingHouse),
      new BuildingHex(BuildingType.Church),
      new BuildingHex(BuildingType.Workshop),
      new BuildingHex(BuildingType.Market),
      new BuildingHex(BuildingType.TownHall),
      new BuildingHex(BuildingType.Warehouse),
      new BuildingHex(BuildingType.Watchtower),
      new BuildingHex(BuildingType.Bank),
      new BuildingHex(BuildingType.BoardingHouse),
      new BuildingHex(BuildingType.Church),
      new BuildingHex(BuildingType.Workshop),
      new BuildingHex(BuildingType.Market),
      new BuildingHex(BuildingType.TownHall),
      new BuildingHex(BuildingType.Warehouse),
    ];
    this.castleSupply = [
      new Hex(TileType.Castles),
      new Hex(TileType.Castles),
      new Hex(TileType.Castles),
      new Hex(TileType.Castles),
      new Hex(TileType.Castles),
      new Hex(TileType.Castles),
      new Hex(TileType.Castles),
      new Hex(TileType.Castles),
      new Hex(TileType.Castles),
      new Hex(TileType.Castles),
      new Hex(TileType.Castles),
      new Hex(TileType.Castles),
      new Hex(TileType.Castles),
      new Hex(TileType.Castles),
    ];
    this.mineSupply = [
      new Hex(TileType.Mines),
      new Hex(TileType.Mines),
      new Hex(TileType.Mines),
      new Hex(TileType.Mines),
      new Hex(TileType.Mines),
      new Hex(TileType.Mines),
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
      new KnowledgeHex(6),
      new KnowledgeHex(7),
      new KnowledgeHex(8),
      new KnowledgeHex(9),
      new KnowledgeHex(10),
      new KnowledgeHex(11),
      new KnowledgeHex(12),
      new KnowledgeHex(13),
      new KnowledgeHex(14),
      new KnowledgeHex(15),
      new KnowledgeHex(16),
      new KnowledgeHex(17),
      new KnowledgeHex(18),
      new KnowledgeHex(19),
      new KnowledgeHex(20),
      new KnowledgeHex(21),
      new KnowledgeHex(22),
      new KnowledgeHex(23),
      new KnowledgeHex(24),
      new KnowledgeHex(25),
      new KnowledgeHex(26),
    ];
    this.blackSupply = [
      new Hex(TileType.Ships),
      new Hex(TileType.Ships),
      new Hex(TileType.Ships),
      new Hex(TileType.Ships),
      new Hex(TileType.Ships),
      new Hex(TileType.Ships),
      new Hex(TileType.Mines),
      new Hex(TileType.Mines),
      new Hex(TileType.Castles),
      new Hex(TileType.Castles),
      new BuildingHex(BuildingType.Watchtower),
      new BuildingHex(BuildingType.Bank),
      new BuildingHex(BuildingType.BoardingHouse),
      new BuildingHex(BuildingType.Church),
      new BuildingHex(BuildingType.Workshop),
      new BuildingHex(BuildingType.Market),
      new BuildingHex(BuildingType.TownHall),
      new BuildingHex(BuildingType.Warehouse),
      new BuildingHex(BuildingType.Watchtower),
      new BuildingHex(BuildingType.Bank),
      new BuildingHex(BuildingType.BoardingHouse),
      new BuildingHex(BuildingType.Church),
      new BuildingHex(BuildingType.Workshop),
      new BuildingHex(BuildingType.Market),
      new BuildingHex(BuildingType.TownHall),
      new BuildingHex(BuildingType.Warehouse),
    ];
    this.discard = [new Hex(TileType.Empty)];
  }
}

export class Game {
  gameBoard: GameBoard;
  box: Box;
  players: PlayerBoard[];

  constructor() {
    this.gameBoard = new GameBoard();
    this.box = new Box();
    this.players = [new PlayerBoard(), new PlayerBoard()];
  }
}

class PlayerBoard {
  silverlings: number;
  goods: [HexSpace, HexSpace, HexSpace, HexSpace];
  workers: number;
  storage: [HexSpace, HexSpace, HexSpace];
  estate: (HexSpace | null)[][];
  dice: [Dice, Dice];
  playerName: string;

  constructor() {
    this.silverlings = 1;
    this.goods = [
      new HexSpace(TileType.Goods),
      new HexSpace(TileType.Goods),
      new HexSpace(TileType.Goods),
      new HexSpace(TileType.Goods),
    ];
    this.workers = 1;
    this.storage = [new HexSpace(TileType.Empty), new HexSpace(TileType.Empty), new HexSpace(TileType.Empty)];
    this.estate = boardOne;
    this.dice = [new Dice(), new Dice()];
    this.playerName = '';
  }
}

class GameBoard {
  phaseSpaces: [Hex[], Hex[], Hex[], Hex[], Hex[]];
  roundSpaces: [HexSpace, HexSpace, HexSpace, HexSpace, HexSpace];
  depots: [HexSpace[], HexSpace[], HexSpace[], HexSpace[], HexSpace[], HexSpace[]];
  centralBlackTiles: HexSpace[];

  constructor() {
    this.phaseSpaces = [[], [], [], [], []];
    this.roundSpaces = [
      new HexSpace(TileType.Goods),
      new HexSpace(TileType.Goods),
      new HexSpace(TileType.Goods),
      new HexSpace(TileType.Goods),
      new HexSpace(TileType.Goods),
    ];
    this.depots = [
      [new HexSpace(TileType.Buildings, 1), new HexSpace(TileType.Ships, 1)],
      [new HexSpace(TileType.Monasteries, 2), new HexSpace(TileType.Castles, 2)],
      [new HexSpace(TileType.Livestocks, 3), new HexSpace(TileType.Buildings, 3)],
      [new HexSpace(TileType.Buildings, 4), new HexSpace(TileType.Ships, 4)],
      [new HexSpace(TileType.Monasteries, 5), new HexSpace(TileType.Mines, 5)],
      [new HexSpace(TileType.Livestocks, 6), new HexSpace(TileType.Buildings, 6)],
    ];
    this.centralBlackTiles = [
      new HexSpace(TileType.Empty),
      new HexSpace(TileType.Empty),
      new HexSpace(TileType.Empty),
      new HexSpace(TileType.Empty),
    ];
  }
}

const boardOne: (HexSpace | null)[][] = [
  [
    null,
    null,
    null,
    new HexSpace(TileType.Livestocks, 6),
    new HexSpace(TileType.Castles, 5),
    new HexSpace(TileType.Castles, 4),
    new HexSpace(TileType.Monasteries, 3),
  ],
  [
    null,
    null,
    new HexSpace(TileType.Livestocks, 2),
    new HexSpace(TileType.Livestocks, 1),
    new HexSpace(TileType.Castles, 6),
    new HexSpace(TileType.Monasteries, 5),
    new HexSpace(TileType.Buildings, 4),
  ],
  [
    null,
    new HexSpace(TileType.Livestocks, 5),
    new HexSpace(TileType.Livestocks, 4),
    new HexSpace(TileType.Buildings, 3),
    new HexSpace(TileType.Monasteries, 1),
    new HexSpace(TileType.Buildings, 2),
    new HexSpace(TileType.Buildings, 3),
  ],
  [
    new HexSpace(TileType.Ships, 6),
    new HexSpace(TileType.Ships, 1),
    new HexSpace(TileType.Ships, 2),
    new HexSpace(TileType.Castles, 6),
    new HexSpace(TileType.Ships, 5),
    new HexSpace(TileType.Ships, 4),
    new HexSpace(TileType.Ships, 1),
  ],
  [
    new HexSpace(TileType.Buildings, 2),
    new HexSpace(TileType.Buildings, 5),
    new HexSpace(TileType.Mines, 4),
    new HexSpace(TileType.Buildings, 3),
    new HexSpace(TileType.Buildings, 1),
    new HexSpace(TileType.Livestocks, 2),
    null,
  ],
  [
    new HexSpace(TileType.Buildings, 6),
    new HexSpace(TileType.Mines, 1),
    new HexSpace(TileType.Monasteries, 2),
    new HexSpace(TileType.Buildings, 5),
    new HexSpace(TileType.Buildings, 6),
    null,
    null,
  ],
  [
    new HexSpace(TileType.Mines, 3),
    new HexSpace(TileType.Monasteries, 4),
    new HexSpace(TileType.Monasteries, 1),
    new HexSpace(TileType.Buildings, 3),
    null,
    null,
    null,
  ],
];

class Dice {
  value: number;

  constructor() {
    this.value = 0;
  }
}
