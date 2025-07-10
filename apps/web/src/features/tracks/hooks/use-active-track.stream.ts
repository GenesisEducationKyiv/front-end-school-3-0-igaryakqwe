import { useEffect } from 'react';
import { socket } from '@/lib/socket';
import useTrackStore, {
  ActiveTrackData,
} from '@/features/tracks/store/use-track.store';

export interface ActiveTrackUpdateEvent {
  activeTrack: ActiveTrackData;
}

export const useActiveTrackStream = (isPlaying: boolean, id?: string) => {
  const activeTrack = useTrackStore((state) => state.activeTrack);
  const setActiveTrack = useTrackStore((state) => state.setActiveTrack);

  const handleConnect = () => {
    console.info('Connected to server');
  };

  const handleDisconnect = () => {
    console.info('Disconnected from server');
  };

  const handleActiveTrackUpdate = (trackData: ActiveTrackData) => {
    if (!id) return;
    setActiveTrack({ id, title: trackData.title });
  };

  const handleConnectError = (error: any) => {
    console.error('Socket connection error:', error);
  };

  useEffect(() => {
    if (!isPlaying) {
      socket.close();
      setActiveTrack(null);
      return;
    }

    socket.connect();

    socket.on('connect', handleConnect);
    socket.on('disconnect', handleDisconnect);
    socket.on('activeTrackUpdate', handleActiveTrackUpdate);
    socket.on('connect_error', handleConnectError);

    return () => {
      socket.off('connect', handleConnect);
      socket.off('disconnect', handleDisconnect);
      socket.off('activeTrackUpdate', handleActiveTrackUpdate);
      socket.off('connect_error', handleConnectError);
      socket.close();
    };
  }, [isPlaying]);

  return activeTrack;
};
