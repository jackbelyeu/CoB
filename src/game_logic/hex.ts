class HexTile {
  type: tileType;
  dieValue: number;

  constructor(t: tileType, d: number) {
    this.type = t;
    this.dieValue = d;
  }
}

const enum tileType {
  Buildings,
  Livestocks,
  Monasteries,
  Castles,
  Mines,
  Ships,
  Key,
}

export class PlayerBoard {
  board: HexTile[][];

  constructor() {
    this.board = [[], [], [], [], [], [], []];
  }
}
