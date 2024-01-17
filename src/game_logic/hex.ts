import { type Box, type CentralBoard, Player, type Room } from '@/game_logic/Game';

export const enum TileType {
  Buildings,
  Livestocks,
  Monasteries,
  Castles,
  Mines,
  Ships,
  Goods,
  Workers,
}

export const enum LivestockType {
  Chickens,
  Pigs,
  Cows,
  Sheep,
}

export const enum BuildingType {
  Warehouse,
  Workshop,
  Church,
  Market,
  BoardingHouse,
  Bank,
  TownHall,
  Watchtower,
}

export class Hex {
  type: TileType;
  black: boolean;

  constructor(t: TileType, b?: boolean) {
    if (b) {
      this.black = b;
    } else {
      this.black = false;
    }
    this.type = t;
  }
}

export class LivestockHex extends Hex {
  animal: LivestockType;
  number: number;

  constructor(a: LivestockType, n: number, b?: boolean) {
    super(TileType.Livestocks, b);
    this.animal = a;
    this.number = n;
  }
}

export class BuildingHex extends Hex {
  building: BuildingType;

  constructor(bu: BuildingType, b?: boolean) {
    super(TileType.Buildings, b);
    this.building = bu;
  }
}

export class KnowledgeHex extends Hex {
  knowledgeNumber: number;

  constructor(k: number, b?: boolean) {
    super(TileType.Monasteries, b);
    this.knowledgeNumber = k;
  }
}

export class HexSpace {
  type: TileType;
  dieValue: number;
  hex: Hex | null;

  constructor(t: TileType, d: number) {
    this.type = t;
    this.dieValue = d;
    this.hex = null;
  }
}

export class Depot {
  hex: HexSpace[];
  good: Hex[];

  constructor(hexOne: TileType, hexTwo: TileType, n: number) {
    this.hex = [new HexSpace(hexOne, n), new HexSpace(hexTwo, n)];
    this.good = [];
  }
}

export const mainBoard: Depot[] = [
  new Depot(TileType.Buildings, TileType.Ships, 1),
  new Depot(TileType.Monasteries, TileType.Castles, 2),
  new Depot(TileType.Livestocks, TileType.Buildings, 3),
  new Depot(TileType.Buildings, TileType.Ships, 4),
  new Depot(TileType.Monasteries, TileType.Mines, 5),
  new Depot(TileType.Livestocks, TileType.Buildings, 6),
];

export const playerBoardOne: (HexSpace | null)[][] = [
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

export const keyTiles: (HexSpace | null)[] = [null, null, null];

export class Dice {
  value: number;

  constructor() {
    this.value = 0;
  }
}

export class gameFunctions {
  static returnAndRemoveRandomFromArray = (array: Array<Hex>): Hex => {
    const index = Math.floor(Math.random() * array.length);
    const item: Hex = array[index];
    array.splice(index, 1);
    return item;
  };

  static hexToString = (h: Hex | null): string => {
    let result = '';
    if (h) {
      result = `I am a ${h.type} Hex`;
    }
    return result;
  };

  static addPlayer(room: Room, playerId: string) {
    const containsPlayerId = room.players.some(player => player.playerId === playerId);
    if (!containsPlayerId) {
      room.players.push(new Player(playerId));
    }
    return room;
  }

  static moveTile = (h: HexSpace, k: HexSpace) => {
    k.hex = h.hex;
    h.hex = null;
  };

  static setBoard = (room: Room) => {
    for (const x of room.centralBoard.outerBoard) {
      for (const y of x.hex) {
        switch (y.type) {
          case TileType.Ships:
            y.hex = this.returnAndRemoveRandomFromArray(room.box.shipSupply);
            break;
          case TileType.Livestocks:
            y.hex = this.returnAndRemoveRandomFromArray(room.box.livestockSupply);
            break;
          case TileType.Buildings:
            y.hex = this.returnAndRemoveRandomFromArray(room.box.buildingSupply);
            break;
          case TileType.Castles:
            y.hex = this.returnAndRemoveRandomFromArray(room.box.castleSupply);
            break;
          case TileType.Mines:
            y.hex = this.returnAndRemoveRandomFromArray(room.box.mineSupply);
            break;
          case TileType.Monasteries:
            y.hex = this.returnAndRemoveRandomFromArray(room.box.knowledgeSupply);
            break;
          default:
            console.log('Invalid TileType');
            break;
        }
      }
    }
    return room;
  };

  static unsetBoard = (board: CentralBoard, box: Box) => {
    for (const x of board.outerBoard) {
      for (const y of x.hex) {
        if (y.hex != null) {
          box.discard.push(y.hex);
          y.hex = null;
        }
      }
    }
  };
}
