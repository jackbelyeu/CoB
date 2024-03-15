import { For, createSignal } from 'solid-js';
import { Hexagon } from '@/components/Hexagon';
import { useGlobalContext } from '@/context/GlobalContext';
import {
  hexSpaceToString,
  hexSpaceToColor,
  hexToString,
  initBoard,
  rollDiceCloudFunction,
  swapHexBetweenSpaces,
  postGameCloudFunction,
  hexToImage,
} from '@/game_logic/GameFunctions';
import styles from '@/game_logic/GameUI.module.scss';
import { HexSpace, TileType } from '@/game_logic/Hex';

export const GameUI = () => {
  const context = useGlobalContext();

  const [tileToBuy, setTileToBuy] = createSignal<HexSpace>(new HexSpace(TileType.Empty));

  return (
    <div class={styles.GameUI}>
      <button>{hexToString(tileToBuy().hex)}</button>
      <button onClick={() => postGameCloudFunction(context.sessionId(), context.game())}>
        Write current game to rtdb
      </button>

      <For each={context.game().gameBoard.depots}>
        {row => (
          <div style={{ display: 'flex', 'justify-content': 'center' }}>
            <For each={row}>
              {cell => (
                <Hexagon
                  onClick={() => {
                    setTileToBuy(cell);
                    console.log(cell.hex);
                  }}
                  color={hexSpaceToColor(cell)}
                  image={hexToImage(cell.hex)}
                >
                  {cell.dieValue}
                </Hexagon>
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
                <div class={styles.row}>
                  <For each={row}>
                    {cell =>
                      cell != null && (
                        <Hexagon
                          onClick={() => {
                            console.log(cell.hex);
                            swapHexBetweenSpaces(cell, tileToBuy());
                          }}
                          color={hexSpaceToColor(cell)}
                          image={hexToImage(cell.hex)}
                        >
                          {cell.dieValue}
                        </Hexagon>
                      )
                    }
                  </For>
                </div>
              )}
            </For>

            <For each={player.storage}>{storageTile => <Hexagon color={hexSpaceToColor(storageTile)} />}</For>
            <For each={player.goods}>{good => <Hexagon color={hexSpaceToColor(good)} />}</For>

            <button>{player.silverlings}</button>
            <button>{player.workers}</button>
            <For each={player.dice}>{die => <button onClick={() => console.log(die.value)}>{die.value}</button>}</For>
          </div>
        )}
      </For>

      <button onClick={() => initBoard(context.game())}>Set/Reset board</button>
      <button onClick={() => rollDiceCloudFunction(context.sessionId())}>Roll all dice</button>
    </div>
  );
};
