import type { ParentProps } from 'solid-js';
import styles from '@/components/Hexagon/Hexagon.module.scss';

export const Hexagon = (props: ParentProps<{ color: string; onClick?: () => void }>) => {
  const handleClick = () => {
    if (typeof props.onClick === 'function') {
      props.onClick();
    }
  };

  return (
    <div class={styles['hexagon-btn']} style={{ 'background-color': props.color }} onClick={handleClick}>
      {props.children}
    </div>
  );
};
