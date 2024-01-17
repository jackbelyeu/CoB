import { createEffect, createSignal, For } from 'solid-js';
import { useGlobalContext } from '@/context/GlobalContext';
import { gameFunctions, TileType, type HexSpace } from '@/game_logic/hex';
import { setRoomToRealtimeDatabase, rtdb } from '@/pages/Firebase';

export const GameUI = () => {
  const context = useGlobalContext();

  const typeMap = {
    null: 'gray',
    [TileType.Ships]: 'blue',
    [TileType.Buildings]: 'tan',
    [TileType.Castles]: 'green',
    [TileType.Goods]: 'purple',
    [TileType.Livestocks]: 'lime',
    [TileType.Mines]: 'silver',
    [TileType.Monasteries]: 'yellow',
    [TileType.Workers]: 'olive',
  };

  const [hexSpaceGiver, setHexSpaceGiver] = createSignal<HexSpace | null>(null);
  const [hexSpaceTaker, setHexSpaceTaker] = createSignal<HexSpace | null>(null);
  createEffect(() => {
    if (hexSpaceGiver() != null && hexSpaceTaker() != null) {
      console.log('Both signals are not null');
      gameFunctions.moveTile(hexSpaceGiver()!, hexSpaceTaker()!);
      setHexSpaceGiver(null);
      setHexSpaceTaker(null);
      setRoomToRealtimeDatabase(context.room()!, rtdb);
    }
  });

  return (
    <div>
      <For each={context.room()!.players[0].board.duchy}>
        {row => (
          <div>
            <For each={row}>
              {cell =>
                cell != null && (
                  <button
                    onClick={() => {
                      console.log(cell.hex);
                      setHexSpaceTaker(cell);
                    }}
                    style={{ 'background-color': typeMap[cell.type] }}
                  >
                    {cell.dieValue}, {gameFunctions.hasHex(cell)}
                  </button>
                )
              }
            </For>
          </div>
        )}
      </For>

      <br />
      <br />

      <For each={context.room()!.players}>
        {player => (
          <div>
            <For each={player.board.keyTiles}>{cell => <button>KeyTile</button>}</For>
          </div>
        )}
      </For>

      <br />
      <br />

      <For each={context.room()!.centralBoard.outerBoard}>
        {row => (
          <div>
            <For each={row.hexSpace}>
              {(cell, cellIndex) =>
                cell != null && (
                  <button
                    onClick={() => {
                      console.log(cell.hex);
                      setHexSpaceGiver(cell);
                    }}
                    style={{ 'background-color': typeMap[cell.type] }}
                  >
                    {cell.dieValue}, {gameFunctions.hasHex(cell)}
                  </button>
                )
              }
            </For>
          </div>
        )}
      </For>

      <button
        onClick={() => {
          setHexSpaceGiver(null);
          setHexSpaceTaker(null);
        }}
      >
        Clear Selected HexSpaces
      </button>
      <button
        onClick={() => {
          gameFunctions.setBoard(context.room()!);
        }}
      >
        Set Board
      </button>
    </div>
  );
};
