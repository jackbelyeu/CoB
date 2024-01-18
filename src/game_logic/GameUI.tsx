import { For } from 'solid-js';
import { useGlobalContext } from '@/context/GlobalContext';
import { hexSpaceToString, hexSpaceToColor } from '@/game_logic/GameFunctions';

export const GameUI = () => {
  const context = useGlobalContext();

  return (
    <div>
      <For each={context.game().gameBoard.depots}>
        {row => (
          <div>
            <For each={row}>
              {cell => <button style={{ 'background-color': hexSpaceToColor(cell) }}>{hexSpaceToString(cell)}</button>}
            </For>
          </div>
        )}
      </For>
      <For each={context.game().playerBoard.estate}>
        {row => (
          <div>
            <For each={row}>
              {cell =>
                cell != null && (
                  <button style={{ 'background-color': hexSpaceToColor(cell) }}>{hexSpaceToString(cell)}</button>
                )
              }
            </For>
          </div>
        )}
      </For>
    </div>
  );
};
