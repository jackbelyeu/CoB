import { type ParentProps, createSignal, createContext, useContext } from 'solid-js';

// Define Global Context
const globalContext = (props: ParentProps) => {
  const [email, setEmail] = createSignal<string>('');
  // const [room, setRoom] = createStore<Room | any>({});

  return { email, setEmail };
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
