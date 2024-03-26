import { For, createSignal } from 'solid-js';
import { Die } from '@/components/Die';
import { Hexagon } from '@/components/Hexagon';
import { useGlobalContext } from '@/context/GlobalContext';
import {
  hexSpaceToColor,
  hexToString,
  initBoard,
  rollDiceCloudFunction,
  swapHexBetweenSpaces,
  postGameCloudFunction,
  hexToImage,
  changeSilverlingsCloudFunction,
  changeWorkersCloudFunction,
} from '@/game_logic/GameFunctions';
import styles from '@/game_logic/GameUI.module.scss';
import { HexSpace, TileType } from '@/game_logic/Hex';

export const GameUI = () => {
  const context = useGlobalContext();

  const [workersAndSilverlings, setWorkersAndSilverlings] = createSignal<number>(0);
  const [tileToBuy, setTileToBuy] = createSignal<HexSpace>(new HexSpace(TileType.Empty));

  return (
    <div class={styles.GameUI}>
      <button>{hexToString(tileToBuy().hex)}</button>
      <button onClick={() => postGameCloudFunction(context.sessionId(), context.game())}>
        Write current game to rtdb
      </button>

      <For each={context.game().gameBoard.phaseSpaces}>{phase => <button>Phase Space</button>}</For>
      <For each={context.game().gameBoard.roundSpaces}>{round => <button>Round Space</button>}</For>

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

      <div style={{ display: 'flex', 'justify-content': 'center' }}>
        <For each={context.game().gameBoard.centralBlackTiles}>
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

      <br />

      <div class={styles.playerBoards}>
        <For each={context.game().players}>
          {(player, index) => (
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

              <div class={styles.row}>
                <For each={player.storage}>
                  {storageTile => (
                    <Hexagon
                      color={hexSpaceToColor(storageTile)}
                      onClick={() => {
                        console.log(storageTile.hex);
                        swapHexBetweenSpaces(storageTile, tileToBuy());
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
                  onClick={() => changeSilverlingsCloudFunction(context.sessionId(), index(), workersAndSilverlings())}
                >
                  Apply
                </button>
              </h3>

              <h3>
                Workers: {player.workers}
                <button
                  onClick={() => changeWorkersCloudFunction(context.sessionId(), index(), workersAndSilverlings())}
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
