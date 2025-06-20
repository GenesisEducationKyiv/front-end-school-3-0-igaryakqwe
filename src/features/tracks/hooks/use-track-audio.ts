import useAudioStore from '@/store/use-audio-store';

interface UseTrackAudioProps {
  trackId: string;
}

const useTrackAudio = ({ trackId }: UseTrackAudioProps) => {
  const currentTrackId = useAudioStore((state) => state.currentTrackId);
  const isPlaying = useAudioStore((state) => state.isPlaying);

  const currentTime = useAudioStore((state) =>
    state.currentTrackId === trackId ? state.currentTime : 0
  );

  const globalAudioRef = useAudioStore((state) => state.globalAudioRef);

  const setCurrentTrackId = useAudioStore((state) => state.setCurrentTrackId);
  const setCurrentTime = useAudioStore((state) => state.setCurrentTime);
  const togglePlay = useAudioStore((state) => state.togglePlay);
  const addToQueue = useAudioStore((state) => state.addToQueue);
  const removeFromQueue = useAudioStore((state) => state.removeFromQueue);
  const previous = useAudioStore((state) => state.previous);
  const next = useAudioStore((state) => state.next);

  const isThisPlaying = isPlaying && currentTrackId === trackId;

  return {
    currentTrackId,
    isPlaying,
    currentTime,
    globalAudioRef,
    isThisPlaying,

    setCurrentTrackId,
    setCurrentTime,
    togglePlay,
    addToQueue,
    removeFromQueue,
    previous,
    next,
  };
};

export default useTrackAudio;
