import { Gamemode, Gamestate } from '@np-bingo/types';
import { useHostStatus, usePlayerStatus } from '.';

export function useStatus(
  gamestate: Gamestate,
  mode: Gamemode,
  count: number,
  host: boolean
) {
  const [hostStatus] = useHostStatus(gamestate, count);
  const [playerStatus] = usePlayerStatus(gamestate, mode);

  const status = host ? hostStatus : playerStatus;

  return [status];
}