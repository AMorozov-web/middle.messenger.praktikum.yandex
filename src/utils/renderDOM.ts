import {Block} from '../components';

/**
 * Помещает собранный компонент в выбранный элемент
 *
 * @param root - элемент
 * @param block - компонент
 */

export const renderDOM = (root: Nullable<HTMLElement>, block: Block) => {
  const element = block.getContent();

  if (element && root) {
    root.appendChild(element);
  }

  return root;
};
