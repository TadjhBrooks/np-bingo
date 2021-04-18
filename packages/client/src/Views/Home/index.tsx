import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import { useHistory, Link as RouterLink } from 'react-router-dom';
import Logo from '../../Components/Logo';
import './style.css';
import Typography from '@material-ui/core/Typography';
import { Room } from '@np-bingo/types';
import { useDialog } from '../../Utils/custom-hooks';
import features from '../../Config/features';
import DialogCode from '../../Components/DialogCode';
import { FeautresContext } from '../../Utils/contexts';

type Props = {
  createRoom: () => void;
  joinRoom: (room: Room) => void;
};

function Home(props: Props) {
  let { createRoom, joinRoom } = props;
  let history = useHistory();
  const [open, handleOpen, handleClose] = useDialog(false);

  function join(room: Room) {
    joinRoom(room);
    history.push(`/play?r=${room}`);
  }

  return (
    <div className="Home">
      <div className="background"></div>
      <header>
        <Logo home={true} />
      </header>
      <div className="main" role="main">
        <Button
          variant="outlined"
          color="primary"
          onClick={createRoom}
          size="large"
        >
          Host
        </Button>
        <FeautresContext.Consumer>
          {(features) => (
            <Button
              variant="contained"
              color="primary"
              component={
                !features['single-player'] && !features['public-rooms']
                  ? 'button'
                  : RouterLink
              }
              to={
                !features['single-player'] && !features['public-rooms']
                  ? undefined
                  : '/join'
              }
              onClick={
                !features['single-player'] && !features['public-rooms']
                  ? handleOpen
                  : undefined
              }
              size="large"
            >
              Play
            </Button>
          )}
        </FeautresContext.Consumer>
      </div>
      <footer>
        <Typography>Made by Tadjh Brooks</Typography>
        <Link href="https://github.com/TadjhBrooks/np-bingo/" color="primary">
          https://github.com/TadjhBrooks/np-bingo
        </Link>
      </footer>
      <DialogCode open={open} handleClose={handleClose} onSumbit={join} />
    </div>
  );
}

export default Home;
