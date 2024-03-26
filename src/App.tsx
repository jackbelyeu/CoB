import { A } from '@solidjs/router';
import type { RouteSectionProps } from '@solidjs/router';
import styles from '@/App.module.scss';
import { Navbar } from '@/components/Navbar';

export const App = (props: RouteSectionProps) => (
  <div class={styles.App}>
    <Navbar>
      <A href="/" end>
        Home
      </A>
      <A href="/firebase" end>
        Castles of Burgundy
      </A>
    </Navbar>
    {props.children}
  </div>
);
