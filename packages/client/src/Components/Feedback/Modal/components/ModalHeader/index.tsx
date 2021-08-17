import React, { useContext } from 'react';
import useSound from 'use-sound';
import CloseIcon from '../../../../../assets/icons/Close';
import { FeautresContext, SoundContext } from '../../../../../context';
import IconButton from '../../../../Elements/IconButton/components/IconButton';
import buttonSfx from '../../Assets/sounds/Click_1.mp3';

export interface ModalHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  onClose?: () => void;
}

export function ModalHeader({
  onClose,
  children,
  ...props
}: ModalHeaderProps): JSX.Element {
  const { defaultVolume } = useContext(FeautresContext);
  const { sounds } = useContext(SoundContext);

  const [playSfx] = useSound(buttonSfx, {
    volume: defaultVolume,
    sprite: {
      buttonPress: [1000, 1000],
    },
    soundEnabled: sounds,
    playbackRate: 1.5,
  });

  const buttonPressSfx = () => {
    playSfx({ id: 'buttonPress' });
  };

  return (
    <div
      className="flex items-center justify-between bg-blue-300 dark:bg-gray-700 px-4 py-2 border-b-2 border-blue-400 dark:border-gray-900"
      {...props}
    >
      <span className="text-lg text-black dark:text-white text-opacity-90 dark:text-opacity-90">
        {children}
      </span>
      <IconButton
        className="close-button"
        onClick={onClose}
        onMouseDown={buttonPressSfx}
      >
        <CloseIcon />
      </IconButton>
    </div>
  );
}