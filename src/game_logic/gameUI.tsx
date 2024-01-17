import { createEffect, createSignal, For } from 'solid-js';
import type { Room } from '@/game_logic/Game';
import { gameFunctions, TileType, type HexSpace } from '@/game_logic/hex';

export const GameUI = (props: { room: Room }) => {
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
    }
  });

  return (
    <div>
      <For each={props.room.players[0].board.duchy}>
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
                    {cell.dieValue}, {gameFunctions.hexToString(cell.hex)}
                  </button>
                )
              }
            </For>
          </div>
        )}
      </For>

      <br />
      <br />

      <For each={props.room.players}>
        {player => (
          <div>
            <For each={player.board.keyTiles}>{cell => <button>KeyTile</button>}</For>
          </div>
        )}
      </For>

      <br />
      <br />

      <For each={props.room.centralBoard.outerBoard}>
        {row => (
          <div>
            <For each={row.hex}>
              {(cell, cellIndex) =>
                cell != null && (
                  <button
                    onClick={() => {
                      console.log(cell.hex);
                      setHexSpaceGiver(cell);
                    }}
                    style={{ 'background-color': typeMap[cell.type] }}
                  >
                    {cell.dieValue}, {gameFunctions.hexToString(cell.hex)}
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
          gameFunctions.setBoard(props.room);
        }}
      >
        Set Board
      </button>
    </div>
  );
};
