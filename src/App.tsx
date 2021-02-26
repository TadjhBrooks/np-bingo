import React, { useReducer } from 'react';
import './App.css';
import {
  INIT_GAME,
  READY_CHECK,
  START_GAME,
  END_GAME,
  CHECK_CARD,
  NEW_BALL,
  UPDATE_POOL,
  BINGO,
  DEBUG,
  STANDBY,
  VALIDATE,
  GET_CARD,
  FAILURE,
} from './Constants';
import { getBall, removeBall, validateCard, getPoolSize } from './Utils/bingo';
import { Ball, Card, Pool, Results, Status, Winner } from './Constants/types';
import Host from './Views/Host';
import Player from './Views/Player';

type State = {
  card: Card;
  ball: Ball;
  pool: Pool;
  draws: Pool;
  valid: boolean | undefined;
  status: Status;
  winner: Winner;
};

type Action = {
  type: string;
  payload?: any;
};

const initialState: State = {
  card: new Array(25),
  ball: { key: 0, value: 0, name: '', remainder: 0 },
  pool: BINGO,
  draws: [[], [], [], [], []],
  valid: undefined,
  status: 'init',
  winner: { methods: [], data: {} },
};

function reducer(state: State, action: Action) {
  switch (action.type) {
    case INIT_GAME:
      return { ...initialState };
    case READY_CHECK:
      return { ...state, status: action.payload };
    case STANDBY:
      return { ...state, status: action.payload };
    case START_GAME:
      return {
        ...state,
        status: action.payload.status,
        valid: action.payload.valid,
      };
    case VALIDATE:
      return { ...state, status: action.payload };
    case FAILURE:
      return { ...state, status: action.payload };
    case END_GAME:
      return { ...state, status: action.payload };
    case GET_CARD:
      return { ...state, card: action.payload };
    case CHECK_CARD:
      return {
        ...state,
        status: action.payload.status,
        valid: action.payload.valid,
        winner: action.payload.winner,
      };
    case NEW_BALL:
      return {
        ...state,
        ball: action.payload.ball,
        draws: action.payload.draws,
        pool: action.payload.pool,
      };
    case UPDATE_POOL:
      return { ...state, ball: { ...state.ball, remainder: action.payload } };
    default:
      throw new Error('Invalid dispatch type.');
  }
}

export const GameContext = React.createContext('init' as Status);
export const BallContext = React.createContext({
  key: 0,
  value: 0,
  name: '',
  remainder: 0,
} as Ball);

function App() {
  const [state, dispatch] = useReducer<(state: State, action: Action) => State>(
    reducer,
    initialState
  );

  /**
   * Manages Bingo game states
   * @param status
   */
  const play = (status: Status) => {
    switch (status) {
      case 'init':
        dispatch({ type: INIT_GAME, payload: 'init' });
        break;
      case 'ready':
        dispatch({ type: READY_CHECK, payload: 'ready' });
        break;
      case 'standby':
        dispatch({ type: STANDBY, payload: 'standby' });
        break;
      case 'start':
        dispatch({
          type: START_GAME,
          payload: { status: 'start', valid: undefined },
        });
        checkPoolSize();
        break;
      case 'validate':
        dispatch({ type: VALIDATE, payload: 'validate' });
        break;
      case 'failure':
        dispatch({ type: FAILURE, payload: 'failure' });
        break;
      case 'end':
        // resetCrossmarks();
        dispatch({ type: END_GAME, payload: 'end' });
        break;
      default:
        throw new Error('Invalid game state.');
    }
  };

  const checkPoolSize = () => {
    let pool: Pool = state.pool;
    let { remainder: data } = getPoolSize(pool);
    dispatch({ type: UPDATE_POOL, payload: data });
  };

  /**
   * Retrieves a new Bingo ball from the remaining pool of balls.
   * Returns undefined if pool is empty.
   */
  const newBall = () => {
    let status: Status = state.status;
    let pool: Pool = [...state.pool];
    let draws: Pool = [...state.draws];
    let ball = getBall(pool);

    if (ball.value !== 0) {
      pool = removeBall(pool, ball);

      // if (!draws) {
      //   draws = [[], [], [], [], []];
      // }

      draws[ball.key].push(ball.value);
    }

    let data = {
      ball,
      draws,
      pool,
    };

    // These probably belong somewhere else outside of this funciton
    if (status === 'standby' || status === 'failure') {
      dispatch({
        type: START_GAME,
        payload: { status: 'start', valid: undefined },
      });
    }

    dispatch({ type: NEW_BALL, payload: data });
  };

  /**
   * Get card from player
   * @param card
   */
  const recieveCard = (card: Card) => {
    dispatch({ type: GET_CARD, payload: [...card] });
  };

  /**
   * Checks if input card is a winner
   * @param card Input card to be checked
   * @param draws Pool of bingo balls that have already been drawn
   */
  const checkCard = (card: Card, draws: Pool) => {
    let data: Results = validateCard(card, draws);
    const methods = Object.keys(data).filter(function (items) {
      return data[items];
    });

    if (methods.length > 0) {
      dispatch({
        type: CHECK_CARD,
        payload: {
          valid: true,
          status: 'end',
          winner: { methods: methods, data: data },
        },
      });
    } else {
      dispatch({
        type: CHECK_CARD,
        payload: {
          valid: false,
          status: 'failure',
          winner: { methods: [], data: {} },
        },
      });
    }
  };

  let { status, ball, draws, card, winner } = state;

  return (
    <GameContext.Provider value={status}>
      <BallContext.Provider value={ball}>
        <div className="App">
          <Host
            play={play}
            checkCard={() => checkCard(card, draws)}
            newBall={newBall}
          ></Host>
          <Player
            play={play}
            winner={winner}
            status={status}
            recieveCard={recieveCard}
          ></Player>
        </div>
        <code className={`Debug ${!DEBUG && 'disabled'}`}>
          <h1>Debug</h1>
          <h3>Current Draws</h3>
          <p>{state.draws ? JSON.stringify(draws) : 'None'}</p>
          <p>by Tadjh Brooks</p>
        </code>
      </BallContext.Provider>
    </GameContext.Provider>
  );
}

export default App;
