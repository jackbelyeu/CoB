export class HexTile {
  type: tileType;
  dieValue: number;
  hasTile: boolean;

  constructor(t: tileType, d: number) {
    this.type = t;
    this.dieValue = d;
    this.hasTile = false;
  }

  switchHasTile() {
    this.hasTile = !this.hasTile;
  }
}

class Depot {
  hex: HexTile[];
  good: HexTile[];
  number: number;

  constructor(hexOne: tileType, hexTwo: tileType, n: number) {
    this.hex = [];
    this.good = [];
    this.number = n;
    this.addTile(new HexTile(hexOne, n));
    this.addTile(new HexTile(hexTwo, n));
  }

  addTile(h: HexTile) {
    if (h.type === tileType.Goods) {
      this.good.push(h);
    } else this.hex.push(h);
  }

  findTile(h: HexTile) {
    return this.hex.find(foundTile => foundTile === h);
  }
}

export const enum tileType {
  Buildings,
  Livestocks,
  Monasteries,
  Castles,
  Mines,
  Ships,
  Goods,
}

export const mainBoard: Depot[] = [
  new Depot(tileType.Buildings, tileType.Ships, 1),
  new Depot(tileType.Monasteries, tileType.Castles, 2),
  new Depot(tileType.Livestocks, tileType.Buildings, 3),
  new Depot(tileType.Buildings, tileType.Ships, 4),
  new Depot(tileType.Monasteries, tileType.Mines, 5),
  new Depot(tileType.Livestocks, tileType.Buildings, 6),
];

export const playerBoardOne: (HexTile | null)[][] = [
  [
    null,
    null,
    null,
    new HexTile(tileType.Livestocks, 6),
    new HexTile(tileType.Castles, 5),
    new HexTile(tileType.Castles, 4),
    new HexTile(tileType.Monasteries, 3),
  ],
  [
    null,
    null,
    new HexTile(tileType.Livestocks, 2),
    new HexTile(tileType.Livestocks, 1),
    new HexTile(tileType.Castles, 6),
    new HexTile(tileType.Monasteries, 5),
    new HexTile(tileType.Buildings, 4),
  ],
  [
    null,
    new HexTile(tileType.Livestocks, 5),
    new HexTile(tileType.Livestocks, 4),
    new HexTile(tileType.Buildings, 3),
    new HexTile(tileType.Monasteries, 1),
    new HexTile(tileType.Buildings, 2),
    new HexTile(tileType.Buildings, 3),
  ],
  [
    new HexTile(tileType.Ships, 6),
    new HexTile(tileType.Ships, 1),
    new HexTile(tileType.Ships, 2),
    new HexTile(tileType.Castles, 6),
    new HexTile(tileType.Ships, 5),
    new HexTile(tileType.Ships, 4),
    new HexTile(tileType.Ships, 1),
  ],
  [
    new HexTile(tileType.Buildings, 2),
    new HexTile(tileType.Buildings, 5),
    new HexTile(tileType.Mines, 4),
    new HexTile(tileType.Buildings, 3),
    new HexTile(tileType.Buildings, 1),
    new HexTile(tileType.Livestocks, 2),
    null,
  ],
  [
    new HexTile(tileType.Buildings, 6),
    new HexTile(tileType.Mines, 1),
    new HexTile(tileType.Monasteries, 2),
    new HexTile(tileType.Buildings, 5),
    new HexTile(tileType.Buildings, 6),
    null,
    null,
  ],
  [
    new HexTile(tileType.Mines, 3),
    new HexTile(tileType.Monasteries, 4),
    new HexTile(tileType.Monasteries, 1),
    new HexTile(tileType.Buildings, 3),
    null,
    null,
    null,
  ],
];

export class gameFunctions {
  static buyTileFromBoard = (giver: Depot, receiever: Depot, h: HexTile) => {
    giver.findTile(h)?.switchHasTile();
    receiever.hex.push(h);
  };
}
