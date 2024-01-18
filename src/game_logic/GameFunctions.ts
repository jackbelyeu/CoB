import { TileType, type HexSpace } from '@/game_logic/Hex';

export const hexSpaceToString = (hexSpace: HexSpace) => {
  return `I am a ${hexSpace.type} type HexSpace`;
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
