import { Action, Gamemode, Gamestate } from '@np-bingo/types';
import { useCallback, useReducer } from 'react';
import logger from 'use-reducer-logger';
import {
  INIT_GAME,
  READY_CHECK,
  STANDBY,
  START_GAME,
  VALIDATE,
  PAUSE,
  FAILURE,
  WIN_GAME,
  END_GAME,
  UPDATE_GAMEMODE,
} from '../Constants';
import { AppState, initialState, reducer } from '../Reducers/app.reducer';

export function useAppState() {
  const [state, dispatch] = useReducer<
    (state: AppState, action: Action) => AppState
  >(
    process.env.NODE_ENV === 'development' ? logger(reducer) : reducer,
    initialState
  );

  /**
   * Manage game state
   * @param gamestate
   */
  const play = useCallback((gamestate: Gamestate) => {
    switch (gamestate) {
      case 'init':
        dispatch({ type: INIT_GAME });
        break;
      case 'ready':
        dispatch({ type: READY_CHECK });
        break;
      case 'standby':
        dispatch({ type: STANDBY });
        break;
      case 'start':
        dispatch({ type: START_GAME });
        break;
      case 'validate':
        dispatch({ type: VALIDATE });
        break;
      case 'pause':
        dispatch({ type: PAUSE });
        break;
      case 'failure':
        dispatch({ type: FAILURE });
        break;
      case 'win':
        dispatch({ type: WIN_GAME });
        break;
      case 'end':
        dispatch({ type: END_GAME });
        break;
      default:
        throw new Error('Invalid game state.');
    }
  }, []);

  /**
   * Update game mode
   * @param gamemode
   */
  const mode = useCallback((gamemode: Gamemode) => {
    switch (gamemode) {
      case 'default':
        dispatch({ type: UPDATE_GAMEMODE, payload: 'default' });
        break;
      case 'solo':
        dispatch({ type: UPDATE_GAMEMODE, payload: 'solo' });
        break;
      case 'death':
        dispatch({ type: UPDATE_GAMEMODE, payload: 'death' });
        break;
      case 'blackout':
        dispatch({ type: UPDATE_GAMEMODE, payload: 'blackout' });
        break;
      default:
        throw new Error('Invalid game mode.');
    }
  }, []);

  return { state, dispatch, play, mode };
}
