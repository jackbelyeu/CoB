import type { ParentProps } from 'solid-js';
import styles from '@/components/Die/Die.module.scss';

export const Die = (props: ParentProps<{ value: number; onClick?: () => void }>) => {
  const handleClick = () => {
    if (typeof props.onClick === 'function') {
      props.onClick();
    }
  };

  return (
    <div class={styles.die} onClick={handleClick}>
      <span class={styles.text}>{props.value}</span>
    </div>
  );
};
