import type { Box, CentralBoard } from '@/game_logic/Game';

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
  Goats,
  Pigs,
  Cows,
  Sheep,
}

export class Hex {
  type: TileType;

  constructor(t: TileType) {
    this.type = t;
  }

  placeHexAction() {
    console.log('placeholder');
  }
}

export class LivestockHex extends Hex {
  animal: LivestockType;
  number: number;

  constructor(a: LivestockType, n: number) {
    super(TileType.Livestocks);
    this.animal = a;
    this.number = n;
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

  addTile(h: Hex | null) {
    this.hex = h;
  }

  removeTile() {
    this.hex = null;
  }

  playTile = (keyTiles: (Hex | null)[], i: number) => {
    this.addTile(keyTiles[i]);
    keyTiles[i] = null;
  };
}

export class Depot {
  hex: HexSpace[];
  good: Hex[];

  constructor(hexOne: TileType, hexTwo: TileType, n: number) {
    this.hex = [new HexSpace(hexOne, n), new HexSpace(hexTwo, n)];
    this.good = [];
  }

  addGood(good: Hex) {
    this.good.push(good);
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

export const keyTiles: (Hex | null)[] = [null, null, null];

export class Worker {
  stack: Hex[];

  constructor() {
    this.stack = [];
  }

  buyWorker(worker: Hex) {
    this.stack.push(worker);
  }

  applyWorkerPlus(die: Dice) {
    die.value = (die.value + 1) % 6;
  }

  applyWorkerMinus(die: Dice) {
    die.value = (die.value - 1) % 6;
  }
}

export class Dice {
  value: number;

  constructor() {
    this.value = 0;
  }

  roll() {
    this.value = Math.floor(Math.random() * 6 + 1);
  }
}

export class gameFunctions {
  static returnAndRemoveRandomFromArray = (array: Array<any>) => {
    const index = Math.floor(Math.random() * array.length);
    const item = array[index];
    array.splice(index, 1);
    return item;
  };

  static buyTile = (h: HexSpace, keyTiles: (Hex | null)[], i: number) => {
    keyTiles[i] = h.hex;
    h.removeTile();
  };

  static setBoard = (board: CentralBoard, box: Box) => {
    for (const x of board.outerBoard) {
      for (const y of x.hex) {
        switch (y.type) {
          case TileType.Ships:
            y.hex = this.returnAndRemoveRandomFromArray(box.shipSupply);
            break;
          case TileType.Livestocks:
            y.hex = this.returnAndRemoveRandomFromArray(box.livestockSupply);
            break;
          case TileType.Buildings:
            console.log('placeholder');
            break;
          case TileType.Castles:
            console.log('placeholder');
            break;
          case TileType.Mines:
            console.log('placeholder');
            break;
          case TileType.Monasteries:
            console.log('placeholder');
            break;
          default:
            console.log('Invalid TileType');
            break;
        }
      }
    }
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
