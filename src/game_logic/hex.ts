export const enum TileType {
  Buildings,
  Livestocks,
  Monasteries,
  Castles,
  Mines,
  Ships,
  Goods,
  Workers,
  Empty,
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

  constructor(t?: TileType) {
    if (t != null) {
      this.type = t;
    } else {
      this.type = TileType.Empty;
    }
  }
}

export class LivestockHex extends Hex {
  animal: LivestockType;
  amount: number;

  constructor(animal: LivestockType, amount: number) {
    super(TileType.Livestocks);
    this.animal = animal;
    this.amount = amount;
  }
}

export class BuildingHex extends Hex {
  building: BuildingType;

  constructor(b: BuildingType) {
    super(TileType.Buildings);
    this.building = b;
  }
}

export class KnowledgeHex extends Hex {
  number: number;

  constructor(n: number) {
    super(TileType.Monasteries);
    this.number = n;
  }
}

export class HexSpace {
  type: TileType;
  dieValue: number | string;
  hex: Hex;

  constructor(t: TileType, d?: number) {
    this.type = t;
    if (d) {
      this.dieValue = d;
    } else {
      this.dieValue = 'Goods';
    }
    this.hex = new Hex();
  }
}
