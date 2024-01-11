import { type Hex, type LivestockHex, TileType } from '@/game_logic/hex';

class Box {
  hexSupply: Hex[];

  constructor() {
    this.hexSupply = [];
  }
}

class Game {
  room: Room;

  constructor(r: Room) {
    this.room = r;
  }
}

class Room {
  players: Player;

  constructor(pOne: Player) {
    this.players = pOne;
  }
}

class Player {
  foo: number;

  constructor() {
    this.foo = 0;
  }
}

class Discard {
  foo: Hex[];

  constructor() {
    this.foo = [];
  }
}
