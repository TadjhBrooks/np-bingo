import clsx from 'clsx';
import PencilIcon from '../../../assets/icons/Pencil';
import Spinner from '../../../assets/icons/Spinner';
import Typography from '../Typography';
import Alert from '../../Feedback/Alert';
import IconButton from '../../Inputs/IconButton';

export interface PlayerNameProps extends React.HTMLAttributes<HTMLDivElement> {
  status?: boolean;
  isLoading: boolean;
  name: string;
  editable?: boolean;
}
// TODO PlayerName.stories.tsx
// TODO Rename PlayerName
export default function PlayerName({
  status,
  name = 'Player#0000',
  isLoading = false,
  editable = false,
  ...props
}: PlayerNameProps) {
  const playerNameAlertStyle = () => {
    switch (status) {
      case true:
        return 'success';
      case false:
        return 'failure';
      default:
        return 'none';
    }
  };
  const [playerName, randomId] = name.split('#', 2);
  return (
    <div className="flex flex-row items-center gap-2 group">
      <div className="flex">
        <div className="w-4 h4">
          {!isLoading ? '\xa0' : <Spinner className="h-4 w-4" />}
        </div>
        <div className="w-[86px] flex justify-end">
          <div
            className={clsx(
              'flex flex-row justify-between items-center gap-1 rounded-xl bg-gray-300 dark:bg-gray-800 px-1 py-0.5 transition duration-500',
              !status && 'opacity-50'
            )}
          >
            <Alert status={playerNameAlertStyle()} />
            <Typography className="text-black dark:text-white text-opacity-40 dark:text-opacity-40 text-xs">
              {status ? 'Connected' : 'Offline'}
            </Typography>
            <div />
          </div>
        </div>
      </div>
      <div>
        <Typography className="flex flex-row items-center text-black dark:text-white text-opacity-90 dark:text-opacity-90 gap-x-1">
          <span>{playerName}</span>
          <span className="text-black dark:text-white text-opacity-40 dark:text-opacity-40">
            {'#' + randomId}
          </span>
        </Typography>
        {editable && (
          <IconButton className="invisible group-hover:visible">
            <PencilIcon size="x-small" />
          </IconButton>
        )}
      </div>
    </div>
  );
}
