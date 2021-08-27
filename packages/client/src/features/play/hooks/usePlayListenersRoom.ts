import { Dispatch, useCallback, useContext, useEffect } from 'react';
import { GameContext, UserContext } from '../../../context';
import { logger } from '../../../utils';
import {
  Ball,
  Gamestate,
  HostAction,
  Room,
  RoomAction,
  Winner,
} from '@np-bingo/types';
import {
  CHECK_CARD,
  CHECK_CARD_FAILURE,
  CHECK_CARD_SUCCESS,
  GAME_OVER,
  INIT,
  PAUSE,
  PLAYER_KICK,
  READY_CHECK,
  SET_BALL,
  STANDBY,
  START,
} from '../../../config/constants';
import { PlayActions } from '../../../reducers/play.reducer';
import { Socket } from 'socket.io-client';
import { AppActions } from '../../../reducers/app.reducer';
//playDispatch: Dispatch<PlayActions>
export function usePlayListenersRoom(
  socket: Socket,
  dispatch: Dispatch<AppActions>
): [() => void, () => void] {
  /**
   * To Room: Sync Gamestate
   * @param gamestate
   */
  const syncGamestate = (gamestate: Gamestate) => {
    switch (gamestate) {
      // case 'init':
      //   dispatch({ type: INIT });
      //   break;
      case 'ready':
        logger('Click to ready up');
        dispatch({ type: READY_CHECK });
        break;
      case 'standby':
        logger('Game starting shortly...');
        dispatch({ type: STANDBY });
        break;
      // case 'start':
      //   logger('Game started');
      //   dispatch({ type: START });
      //   break;
      // case 'validate':
      //   dispatch({ type: CHECK_CARD });
      //   break;
      // case 'pause':
      //   logger(`A card has been sent to the host. Checking if it's a winner!`);
      //   dispatch({ type: PAUSE });
      //   break;
      // case 'failure':
      //   logger(`The card was not a winner...`);
      //   dispatch({ type: CHECK_CARD_FAILURE });
      //   break;
      // case 'win':
      case 'end':
        logger('Game over!');
        dispatch({ type: GAME_OVER });
        break;
      default:
        throw new Error('Invalid game state.');
    }
  };

  /**
   * To Room: Ball dispensed
   */
  const ballDispensed = (ball: Ball) => {
    logger(`Ball: ${ball.column.toUpperCase()}${ball.number}`);
    dispatch({ type: SET_BALL, payload: ball });
  };

  /**
   * To Room Winner: Win Game
   * @param winner
   */
  // const winGame = (winner: Winner) => {
  //   logger(`You won the game!`);
  //   dispatch({ type: CHECK_CARD_SUCCESS, payload: winner });
  // };

  // const loseGame =()=>{

  // }

  /**
   * Room Actions Handler
   * @param action
   */
  // TODO Improve typing
  const roomListener = (
    action: RoomAction,
    payload: Ball | Gamestate | Winner
  ) => {
    switch (action) {
      case 'sync-gamestate':
        syncGamestate(payload as Gamestate);
        break;
      case 'ball-dispensed':
        ballDispensed(payload as Ball);
        break;
      // case 'win-game':
      //   winGame(payload as Winner);
      //   break;
      // case 'lose-game':
      //   break;
      default:
        throw new Error('Error in room action');
    }
  };

  /**
   * Subscribe to Room events
   */
  const subscribeToRoom = () => {
    logger('Listening for room actions...');
    socket.on('room:event', roomListener);
  };

  /**
   * Unsubscribe to Room events
   */
  const unsubscribeToRoom = () => {
    logger('No longer listening for room actions.');
    socket.off('room:event', roomListener);
  };

  /**
   * To Player: Loser
   */
  // const listenGameLoser = useCallback(() => {
  //   socket.on('loser', () => {
  //     logger(`This card is not a winner...`);
  //     dispatchCheckCardFailure();
  //   });
  // }, [socket, dispatchCheckCardFailure]);

  // const deafenGameLoser = useCallback(() => {
  //   socket.off('loser');
  // }, [socket]);

  // TODO Turn state changes into ONE socket subscription that sends state change strings
  /**
   * Socket.io Side-effects
   */
  // useEffect(() => {
  //   switch (gamestate) {
  //     case 'init':
  //       listenGameReady();
  //       break;
  //     case 'ready':
  //       deafenGameReady();
  //       listGameStandby();
  //       break;
  //     case 'standby':
  //       deafenGameStandby();
  //       listenGameStart();
  //       break;
  //     case 'start':
  //       deafenGameStart();
  //       listenDispeneBall();
  //       deafenGameContinue();
  //       break;
  //     case 'validate':
  //       deafenDispenseBall();
  //       listenGameValidation();
  //       listenGameWinner();
  //       listenGameLoser();
  //       break;
  //     case 'pause':
  //       deafenGameValidation();
  //       listGameRoomWinner();
  //       listenGameContinue();
  //       listenGameEnd();
  //       break;
  //     case 'end':
  //       deafenGameWinner();
  //       deafenGameRoomWinner();
  //       deafenGameLoser();
  //       deafenGameValidation();
  //       deafenGameEnd();
  //       break;
  //   }
  // });
  return [subscribeToRoom, unsubscribeToRoom];
}