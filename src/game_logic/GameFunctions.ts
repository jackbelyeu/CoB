import BuildingImage from '@/assets/Building.png';
import CastleImage from '@/assets/Castle.png';
import KnowledgeImage from '@/assets/Knowledge.png';
import LivestockImage from '@/assets/Livestock.png';
import MineImage from '@/assets/Mine.png';
import ShipImage from '@/assets/burgundy_ship_ai.png';
import { Game } from '@/game_logic/Game';
import { TileType, type HexSpace, type Hex } from '@/game_logic/Hex';
import { generateSessionId } from '@/pages/Firebase';

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

export const hexToImage = (hex: Hex) => {
  switch (hex.type) {
    case TileType.Ships:
      return ShipImage;
    case TileType.Monasteries:
      return KnowledgeImage;
    case TileType.Mines:
      return MineImage;
    case TileType.Livestocks:
      return LivestockImage;
    case TileType.Castles:
      return CastleImage;
    case TileType.Buildings:
      return BuildingImage;

    default:
      return '';
  }
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

const addPlayerToGame = (game: Game, playerName: string) => {
  for (const x of game.players) {
    if (x.playerName === '') {
      x.playerName = playerName;
      break;
    }
  }

  return game;
};

export const postGameCloudFunction = async (sessionId: string, game: Game) => {
  const res = await fetch('http://127.0.0.1:5001/first-firebase-app-74753/us-central1/postGame', {
    method: 'POST',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify({ sessionId, game }),
  });
  if (!res.ok) throw Error('Failed to post game');
  return res.json();
};

export const swapHexesCloudFunction = async (sessionId: string, swapFrom?: HexSpace, swapTo?: HexSpace) => {
  const res = await fetch('http://127.0.0.1:5001/first-firebase-app-74753/us-central1/swapHexes', {
    method: 'POST',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify({ sessionId, swapFrom, swapTo }),
  });
  if (!res.ok) throw Error('Failed to swap hexes');
  return res.json();
};

export const createSessionCloudFunction = async (playerName: string) => {
  const sessionId = generateSessionId();
  let game = new Game();
  game = initBoard(game);
  game = addPlayerToGame(game, playerName);
  const res = await fetch('http://127.0.0.1:5001/first-firebase-app-74753/us-central1/createGame', {
    method: 'POST',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify({ sessionId, game }),
  });
  if (!res.ok) throw Error('Failed to create game');
  return res.json();
};

export const joinGameCloudFunction = async (sessionId: string, playerName: string) => {
  const res = await fetch('http://127.0.0.1:5001/first-firebase-app-74753/us-central1/createGame', {
    method: 'POST',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify({ sessionId }),
  });
  if (!res.ok) throw Error('Failed to join game');
  return res.json();
};

export const rollDiceCloudFunction = async (sessionId: string) => {
  const res = await fetch('http://127.0.0.1:5001/first-firebase-app-74753/us-central1/rollDice', {
    method: 'POST',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify({ sessionId }),
  });
  if (!res.ok) throw Error('Failed to roll dice');
  return res.json();
};

export const changeSilverlingsCloudFunction = async (sessionId: string, playerNumber: number, number: number) => {
  const res = await fetch('http://127.0.0.1:5001/first-firebase-app-74753/us-central1/changeSilverlings', {
    method: 'POST',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify({ sessionId, playerNumber, number }),
  });
  if (!res.ok) throw Error('Failed');
  return res.json();
};

export const changeWorkersCloudFunction = async (sessionId: string, playerNumber: number, number: number) => {
  const res = await fetch('http://127.0.0.1:5001/first-firebase-app-74753/us-central1/changeWorkers', {
    method: 'POST',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify({ sessionId, playerNumber, number }),
  });
  if (!res.ok) throw Error('Failed');
  return res.json();
};
