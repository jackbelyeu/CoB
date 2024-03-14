import type { ParentProps } from 'solid-js';
import styles from '@/components/Hexagon/Hexagon.module.scss';

export const Hexagon = (
  props: ParentProps<{ color: string; onClick?: () => void; image?: string; hasImage?: boolean }>
) => {
  const handleClick = () => {
    if (typeof props.onClick === 'function') {
      props.onClick();
    }
  };

  const hexagonStyle = props.hasImage ? { 'background-image': `${props.image}` } : { 'background-color': props.color };

  return (
    <div class={styles['hexagon-btn']} style={hexagonStyle} onClick={handleClick}>
      {props.children}
    </div>
  );
};
