import { createSignal } from 'solid-js';
import { useCounter, useMouse } from 'solidjs-use';
import Image from '@/assets/burgundy_ship_ai.png';
import logo from '@/assets/logo.svg?url';
import { Hexagon } from '@/components/Hexagon';
import styles from '@/pages/Home/Home.module.scss';
import { fetchUser, type UserFetchResponse } from '@/services/userService';

export const Home = () => {
  const { x, y } = useMouse();
  const { count, inc, dec } = useCounter();
  const [userData, setUserData] = createSignal<UserFetchResponse | undefined>();

  fetchUser().then(setUserData);

  return (
    <div class={styles.Home}>
      <img prop:src={logo} alt="logo" />
      <h1>Solid + Vite + TypeScript</h1>
      <h3>Hello, {userData()?.name ?? 'guest'}!</h3>
      <h3>
        Mouse: {x()} x {y()}
      </h3>
      <h3>
        Counter: {count()}
        <button onClick={() => inc()}>+</button>
        <button onClick={() => dec()}>-</button>
      </h3>
      <div style={{ display: 'flex', 'justify-content': 'center' }}>
        <Hexagon
          onClick={() => {
            console.log('clicked');
          }}
          color="red"
          image={Image}
        >
          Hexagon
        </Hexagon>
        <Hexagon
          onClick={() => {
            console.log('clicked');
          }}
          color="blue"
        >
          Hexagon
        </Hexagon>
      </div>
      <br />
      made by Jack Belyeu
    </div>
  );
};
