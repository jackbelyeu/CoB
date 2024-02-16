import type { ParentProps } from 'solid-js';
import styles from '@/components/Hexagon/Hexagon.module.scss';

export const Hexagon = (props: ParentProps<{ color: string }>) => (
  <div class={styles['hexagon-btn']} style={{ 'background-color': props.color }}>
    {props.children}
  </div>
);
