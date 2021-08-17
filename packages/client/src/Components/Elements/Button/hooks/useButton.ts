import { useContext } from 'react';
import useSound from 'use-sound';
import { SoundContext } from '../../../../context';
import { buttonSfx } from '../../../../config/sounds';
import { ButtonVariants } from '..';
export function useButton(variant: ButtonVariants, disabled: boolean) {
  const { volume, sounds } = useContext(SoundContext);

  const [playSfx] = useSound(buttonSfx, {
    volume: volume / 2,
    sprite: {
      buttonPress: [0, 1000],
    },
    soundEnabled: sounds,
    playbackRate: 1.5,
  });

  /**
   * Wrapper for button mouse down event
   */
  const buttonPressSfx = () => {
    playSfx({ id: 'buttonPress' });
  };

  const style = (disabled && 'disabled') || variant;

  /**
   * Button style based on variant or disabled
   * @param variant
   * @returns string
   */
  const buttonStyle = (): string => {
    switch (style) {
      case 'disabled':
        return 'disabled:opacity-50 disabled:bg-gray-400 dark:disabled:bg-gray-700 disabled:text-gray-800 dark:disabled:text-gray-400 disabled:shadow-none disabled:cursor-default disabled:translate-y-0';
      case 'contained':
        return 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-300 dark:hover:bg-blue-400 text-white dark:text-black text-opacity-90 dark:text-opacity-90';
      default:
        return 'text-blue-600 hover:text-blue-700 dark:text-blue-300 dark:hover:text-blue-700 hover:bg-gray-300';
    }
  };

  return [buttonPressSfx, buttonStyle];
}