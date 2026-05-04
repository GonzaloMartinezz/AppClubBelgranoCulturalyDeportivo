import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { SOCKET_URL } from '../../../app/constants';

export const useLiveMatch = (matchId) => {
  const [score, setScore] = useState({ home: 0, away: 0, quarter: 0 });
  const [boxScore, setBoxScore] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    const socket = io(`${SOCKET_URL}/match`);

    socket.on('connect', () => {
      setIsConnected(true);
      socket.emit('join-match', matchId);
    });

    socket.on('disconnect', () => setIsConnected(false));

    socket.on('score-update', (data) => {
      setScore(data.score);
    });

    socket.on('player-stat-update', ({ playerId, stat, value }) => {
      setBoxScore(prev => prev.map(p =>
        p.playerId === playerId ? { ...p, [stat]: value } : p
      ));
    });

    socket.on('status-change', ({ status }) => setStatus(status));

    return () => {
      socket.emit('leave-match', matchId);
      socket.disconnect();
    };
  }, [matchId]);

  return { score, boxScore, setBoxScore, isConnected, status };
};
