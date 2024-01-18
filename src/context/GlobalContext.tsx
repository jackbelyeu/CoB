import { type ParentProps, createSignal, createContext, useContext } from 'solid-js';
import { Game } from '@/game_logic/Game';

// Define Global Context
const globalContext = (props: ParentProps) => {
  const [email, setEmail] = createSignal<string>('');
  const [game, setGame] = createSignal<Game>(new Game());

  return { email, setEmail, game, setGame };
};

// Initialize Global Context
const GlobalContext = createContext<ReturnType<typeof globalContext>>();

// Component to Provide Global Context
export const GlobalContextProvider = (props: ParentProps) => {
  const value = globalContext(props);
  return <GlobalContext.Provider value={value}>{props.children}</GlobalContext.Provider>;
};

// Hook to use Global Context
export const useGlobalContext = () => useContext(GlobalContext)!;
