import { For, createSignal } from 'solid-js';
import { Die } from '@/components/Die';
import { Hexagon } from '@/components/Hexagon';
import { useGlobalContext } from '@/context/GlobalContext';
import {
  hexSpaceToColor,
  hexToString,
  initBoard,
  rollDiceCloudFunction,
  postGameCloudFunction,
  hexToImage,
  changeSilverlingsCloudFunction,
  changeWorkersCloudFunction,
  swapHexes_mainBoardToStorage_CloudFunction,
} from '@/game_logic/GameFunctions';
import styles from '@/game_logic/GameUI.module.scss';
import { HexSpace, TileType } from '@/game_logic/Hex';

export const GameUI = () => {
  const context = useGlobalContext();

  const [workersAndSilverlings, setWorkersAndSilverlings] = createSignal<number>(0);
  const [tileToBuy, setTileToBuy] = createSignal<[HexSpace, number, number]>([new HexSpace(TileType.Empty), 0, 0]);

  return (
    <div class={styles.GameUI}>
      <button>{hexToString(tileToBuy()[0].hex)}</button>
      <button onClick={() => postGameCloudFunction(context.sessionId(), context.game())}>
        Write current game to rtdb
      </button>

      <For each={context.game().gameBoard.phaseSpaces}>{phase => <button>Phase Space</button>}</For>
      <For each={context.game().gameBoard.roundSpaces}>{round => <button>Round Space</button>}</For>

      <For each={context.game().gameBoard.depots}>
        {(row, index_row) => (
          <div style={{ display: 'flex', 'justify-content': 'center' }}>
            <For each={row}>
              {(cell, index_col) => (
                <Hexagon
                  onClick={() => {
                    setTileToBuy([cell, index_row(), index_col()]);
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

      <div style={{ display: 'flex', 'justify-content': 'center' }}>
        <For each={context.game().gameBoard.centralBlackTiles}>
          {cell => (
            <Hexagon color={hexSpaceToColor(cell)} image={hexToImage(cell.hex)}>
              {cell.dieValue}
            </Hexagon>
          )}
        </For>
      </div>

      <br />

      <div class={styles.playerBoards}>
        <For each={context.game().players}>
          {(player, index_player) => (
            <div style={{ flex: '1' }}>
              <For each={player.estate}>
                {row => (
                  <div class={styles.row}>
                    <For each={row}>
                      {cell =>
                        cell != null && (
                          <Hexagon
                            onClick={() => {
                              console.log(cell.hex);
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

              <div class={styles.row}>
                <For each={player.storage}>
                  {(storageTile, index_storage) => (
                    <Hexagon
                      color={hexSpaceToColor(storageTile)}
                      onClick={() => {
                        console.log(
                          context.sessionId(),
                          tileToBuy()[0],
                          storageTile,
                          index_player(),
                          tileToBuy()[1],
                          tileToBuy()[2],
                          index_storage()
                        );
                        swapHexes_mainBoardToStorage_CloudFunction(
                          context.sessionId(),
                          tileToBuy()[0],
                          index_player(),
                          tileToBuy()[1],
                          tileToBuy()[2],
                          index_storage()
                        );
                      }}
                      image={hexToImage(storageTile.hex)}
                    />
                  )}
                </For>
              </div>
              <div class={styles.row}>
                <For each={player.goods}>{good => <Hexagon color={hexSpaceToColor(good)} />}</For>
              </div>

              <h3>
                Silverlings: {player.silverlings}
                <button
                  onClick={() =>
                    changeSilverlingsCloudFunction(context.sessionId(), index_player(), workersAndSilverlings())
                  }
                >
                  Apply
                </button>
              </h3>

              <h3>
                Workers: {player.workers}
                <button
                  onClick={() =>
                    changeWorkersCloudFunction(context.sessionId(), index_player(), workersAndSilverlings())
                  }
                >
                  Apply
                </button>
              </h3>

              <input onChange={e => setWorkersAndSilverlings(parseInt(e.target.value))} />

              <div class={styles.row}>
                <For each={player.dice}>{die => <Die value={die.value} onClick={() => console.log(die.value)} />}</For>
              </div>
            </div>
          )}
        </For>
      </div>

      <button onClick={() => initBoard(context.game())}>Set/Reset board</button>
      <button onClick={() => rollDiceCloudFunction(context.sessionId())}>Roll all dice</button>
    </div>
  );
};
