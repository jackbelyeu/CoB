import { For, createSignal } from 'solid-js';
import { Hexagon } from '@/components/Hexagon';
import { useGlobalContext } from '@/context/GlobalContext';
import {
  hexSpaceToString,
  hexSpaceToColor,
  hexToString,
  initBoard,
  swapHexBetweenSpaces,
} from '@/game_logic/GameFunctions';
import styles from '@/game_logic/GameUI.module.scss';
import { HexSpace, TileType } from '@/game_logic/Hex';

export const GameUI = () => {
  const context = useGlobalContext();

  const [tileToBuy, setTileToBuy] = createSignal<HexSpace>(new HexSpace(TileType.Empty));

  return (
    <div class={styles.GameUI}>
      <For each={context.game().gameBoard.depots}>
        {row => (
          <div>
            <For each={row}>
              {cell => (
                <>
                  <Hexagon color={hexSpaceToColor(cell)} />
                  <button
                    onClick={() => {
                      console.log(cell, cell.hex);
                      setTileToBuy(cell);
                    }}
                    style={{ 'background-color': hexSpaceToColor(cell) }}
                  >
                    {hexSpaceToString(cell)},{hexToString(cell.hex)}
                  </button>
                </>
              )}
            </For>
          </div>
        )}
      </For>

      <br />

      <For each={context.game().players}>
        {player => (
          <div>
            <For each={player.estate}>
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
        )}
      </For>

      <button onClick={() => initBoard(context.game())}>Set/Reset Board</button>
      <button onClick={() => console.log(context.game().box.discard)}>console log discard</button>
    </div>
  );
};
