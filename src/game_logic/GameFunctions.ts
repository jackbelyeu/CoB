import type { Game } from '@/game_logic/Game';
import { TileType, type HexSpace, type Hex } from '@/game_logic/Hex';

export const hexSpaceToString = (hexSpace: HexSpace) => {
  return `I am a ${hexSpace.type} type HexSpace`;
};

export const hexToString = (hex: Hex) => {
  return `I am a ${hex.type} type Hex`;
};

export const hexSpaceToColor = (hexSpace: HexSpace) => {
  let color = 'gray';
  switch (hexSpace.type) {
    case TileType.Workers:
      color = 'olive';
      break;
    case TileType.Ships:
      color = 'blue';
      break;
    case TileType.Monasteries:
      color = 'yellow';
      break;
    case TileType.Livestocks:
      color = 'lime';
      break;
    case TileType.Buildings:
      color = 'tan';
      break;
    case TileType.Castles:
      color = 'green';
      break;
    case TileType.Empty:
      color = 'red';
      break;
    case TileType.Goods:
      color = 'purple';
      break;
    case TileType.Mines:
      color = 'silver';
      break;
    default:
      break;
  }

  return color;
};

const randomlyPickAndRemoveItemFromArray = (array: Array<any>) => {
  const randomIndex = Math.floor(Math.random() * array.length);
  const item = array[randomIndex];
  array.splice(randomIndex, 1);
  return item;
};

export const initBoard = (game: Game) => {
  for (const x of game.gameBoard.depots) {
    for (const y of x) {
      if (y.hex.type !== TileType.Empty) {
        game.box.discard.push(y.hex);
      }
      switch (y.type) {
        case TileType.Ships:
          y.hex = randomlyPickAndRemoveItemFromArray(game.box.shipSupply);
          break;
        case TileType.Livestocks:
          y.hex = randomlyPickAndRemoveItemFromArray(game.box.livestockSupply);
          break;
        case TileType.Buildings:
          y.hex = randomlyPickAndRemoveItemFromArray(game.box.buildingSupply);
          break;
        case TileType.Castles:
          y.hex = randomlyPickAndRemoveItemFromArray(game.box.castleSupply);
          break;
        case TileType.Mines:
          y.hex = randomlyPickAndRemoveItemFromArray(game.box.mineSupply);
          break;
        case TileType.Monasteries:
          y.hex = randomlyPickAndRemoveItemFromArray(game.box.knowledgeSupply);
          break;
        default:
          console.log('Invalid TileType');
          break;
      }
    }
  }
  return game;
};

export const swapHexBetweenSpaces = (hexSpaceOne: HexSpace, hexSpaceTwo: HexSpace) => {
  const temp = hexSpaceOne.hex;
  hexSpaceOne.hex = hexSpaceTwo.hex;
  hexSpaceTwo.hex = temp;
};

export const swapHexesCloudFunction = async (sessionId: string, swapFrom?: HexSpace, swapTo?: HexSpace) => {
  const res = await fetch('http://127.0.0.1:5001/first-firebase-app-74753/us-central1/swapHexes', {
    method: 'POST',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify({ sessionId, swapFrom, swapTo }),
  });
  if (!res.ok) throw Error('Failed to fetch user');
  return await res.json();
};
