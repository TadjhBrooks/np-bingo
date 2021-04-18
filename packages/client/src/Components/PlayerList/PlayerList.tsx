import React from 'react';
import './style.css';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import RemoveIcon from '@material-ui/icons/Remove';
import CheckIcon from '@material-ui/icons/Check';
import CancelIcon from '@material-ui/icons/Cancel';
import { Player } from '@np-bingo/types';
import Typography from '@material-ui/core/Typography';

export interface ListProps {
  data?: any[];
  action?: (param?: any) => void;
}

export interface PlayerListProps extends ListProps {
  action?: (player: Player) => void;
}

export default function PlayerList({
  data = [],
  action: onRemove,
}: PlayerListProps) {
  return (
    <div className="player-list">
      {/* <Typography variant="h5" gutterBottom>
        Players
      </Typography> */}
      {data.length !== 0 ? (
        <List>
          {data.map((player, index) => {
            return (
              <ListItem key={`player${index + 1}`}>
                <ListItemAvatar>
                  <Avatar>
                    {player.ready ? <CheckIcon /> : <RemoveIcon />}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={player.name}
                  secondary={player.ready ? 'Ready' : 'Selecting a card...'}
                />
                <ListItemSecondaryAction>
                  <IconButton
                    onClick={onRemove && (() => onRemove(player))}
                    edge="end"
                    aria-label="status"
                  >
                    <CancelIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            );
          })}
        </List>
      ) : (
        <Typography align="center">No players found</Typography>
      )}
    </div>
  );
}
