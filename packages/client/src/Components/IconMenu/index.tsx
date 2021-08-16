import React, { useContext, useState } from 'react';
import { useEffect } from 'react';
import useSound from 'use-sound';
import CloseIcon from '../../assets/icons/Close';
import Cog from '../../assets/icons/Cog';
import { FeautresContext, SoundContext } from '../../context';
import IconButton from '../Elements/IconButton';
import ThemeToggle from '../ThemeToggle';
import { TooltipDirection } from '../Elements/Tooltip';
import VolumeToggle from '../VolumeToggle';
import menuSfx from '../../Assets/sounds/Drawer_Open_Close.mp3';

export type MenuDirection = 'up' | 'right' | 'down' | 'left';

export interface IconMenuProps
  extends React.ButtonHTMLAttributes<HTMLDivElement> {
  direction?: MenuDirection;
  open?: boolean;
}

export default function IconMenu({
  direction = 'down',
  open: override = false,
  ...props
}: IconMenuProps): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const { defaultVolume } = useContext(FeautresContext);
  const { sounds } = useContext(SoundContext);
  const [playMenuSfx] = useSound(menuSfx, {
    volume: defaultVolume,
    sprite: {
      menuOpen: [3000, 1000],
      menuClosed: [2000, 1000],
    },
    soundEnabled: sounds,
  });

  /**
   * Override default menu open state on component mount if override is set
   */
  useEffect(() => {
    if (!override) return;
    setIsOpen(override);
  }, [override]);

  /**
   * Toggle menu open or closed
   */
  const toggle = () => {
    setIsOpen((prevOpen) => !prevOpen);
  };

  /**
   * Close menu
   */
  const close = () => {
    setIsOpen(false);
  };

  /**
   * Play open menu sfx
   */
  const openSfx = () => {
    playMenuSfx({ id: 'menuOpen' });
  };

  /**
   * Play clsoe menu sfx
   */
  const closeSfx = () => {
    playMenuSfx({ id: 'menuClosed' });
  };

  /**
   * Toggle menu sound effect based on open or closed
   */
  const toggleSfx = () => {
    !isOpen ? openSfx() : closeSfx();
  };

  /**
   * Returns classes for popout menu based on direction
   * @param direction
   * @returns classes
   */
  const stylePopoutMenu = (direction: MenuDirection): string => {
    switch (direction) {
      case 'up':
        return 'flex-col-reverse bottom-0';
      case 'down':
        return 'flex-col';
      case 'left':
        return 'flex-row-reverse right-0';
      case 'right':
        return 'flex-row';
      default:
        throw new Error('Error in style popout menu');
    }
  };

  /**
   * Changes tooltip direction based on menu direction
   * @param direction
   * @returns Tooltip Direction
   */
  const stylePopoutMenuTooltips = (
    direction: MenuDirection
  ): TooltipDirection => {
    switch (direction) {
      case 'up':
        return 'left';
      case 'down':
        return 'left';
      case 'left':
        return 'top';
      case 'right':
        return 'top';
      default:
        throw new Error('Error in style popout menu tooltip');
    }
  };

  return (
    <div
      className={`relative block w-14 h-14 ${
        !isOpen ? 'overflow-hidden hover:overflow-visible' : ''
      }`}
    >
      <ul
        className={`absolute flex p-1 transition-all duration-75 rounded-full border-2 ${
          isOpen
            ? 'z-50 bg-gray-300 dark:bg-gray-700 shadow-2xl border-gray-500 dark:border-gray-600'
            : 'border-transparent'
        } ${stylePopoutMenu(direction)}`}
      >
        <li>
          <IconButton
            onClick={toggle}
            onMouseDown={toggleSfx}
            description="Settings"
            direction={stylePopoutMenuTooltips(direction)}
          >
            <Cog className="text-black dark:text-white text-opacity-40 dark:text-opacity-50 group-hover:text-opacity-70" />
          </IconButton>
        </li>
        <li className={`${!isOpen ? 'invisible' : ''}`}>
          <ThemeToggle direction={stylePopoutMenuTooltips(direction)} />
        </li>
        <li className={`${!isOpen ? 'invisible' : ''}`}>
          <VolumeToggle direction={stylePopoutMenuTooltips(direction)} />
        </li>
        <li className={`${!isOpen ? 'invisible' : ''}`}>
          <IconButton
            onClick={close}
            onMouseDown={closeSfx}
            description="Close"
            direction={stylePopoutMenuTooltips(direction)}
          >
            <CloseIcon className="text-black dark:text-white text-opacity-40 dark:text-opacity-50 group-hover:text-opacity-70" />
          </IconButton>
        </li>
      </ul>
    </div>
  );
}
