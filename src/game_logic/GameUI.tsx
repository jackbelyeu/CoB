import { For, createSignal } from 'solid-js';
import { useGlobalContext } from '@/context/GlobalContext';
import {
  hexSpaceToString,
  hexSpaceToColor,
  hexToString,
  initBoard,
  swapHexBetweenSpaces,
} from '@/game_logic/GameFunctions';
import { HexSpace, TileType } from '@/game_logic/Hex';

export const GameUI = () => {
  const context = useGlobalContext();

  const [tileToBuy, setTileToBuy] = createSignal<HexSpace>(new HexSpace(TileType.Empty));

  return (
    <div>
      <For each={context.game().gameBoard.depots}>
        {row => (
          <div>
            <For each={row}>
              {cell => (
                <button
                  onClick={() => {
                    console.log(cell, cell.hex);
                    setTileToBuy(cell);
                  }}
                  style={{ 'background-color': hexSpaceToColor(cell) }}
                >
                  {hexSpaceToString(cell)},{hexToString(cell.hex)}
                </button>
              )}
            </For>
          </div>
        )}
      </For>

      <br />

      <For each={context.game().playerBoard.estate}>
        {row => (
          <div>
            <For each={row}>
              {cell =>
                cell != null && (
                  <button
                    onClick={() => swapHexBetweenSpaces(cell, tileToBuy())}
                    style={{ 'background-color': hexSpaceToColor(cell) }}
                  >
                    {hexSpaceToString(cell)},{hexToString(cell.hex)}
                  </button>
                )
              }
            </For>
          </div>
        )}
      </For>
    </div>
  );
};
