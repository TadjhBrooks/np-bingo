import { useMemo } from 'react';
import { Socket } from 'socket.io-client';
import { Room } from '@np-bingo/types';
import socketInit from '../lib/socket.io';
import { logger } from '../utils';

export function useAppSocket() {
  const socket = useMemo(socketInit, [socketInit]);
  /**
   * Host Manual Connect
   */
  const hostConnect = (room: Room) => {
    if (socket.id) return;
    connect();
    emitCreateRoom(room);
  };

  /**
   * Host: Emit create room
   * @param room
   */
  const emitCreateRoom = (room: Room) => {
    socket.emit('host:create-room', room);
  };

  /**
   * Connect
   */
  const connect = () => {
    socket.connect();
  };

  /**
   * Disconnect
   */
  const disconnect = () => {
    socket.disconnect();
  };

  /**
   * On Connect event
   */
  const onConnect = () => {
    logger('You have connected');
    logger(socket.id);
  };

  /**
   * On Disconnect event
   */
  const onDisconnect = () => {
    logger('You have disconnected');
  };

  /**
   * Connect event listener
   */
  socket.on('connect', onConnect);

  /**
   * Disconnect event listener
   */
  socket.on('disconnect', onDisconnect);

  return {
    socket,
    hostConnect,
  };
}
