import { useCallback, useEffect, useRef, useState } from 'react';

import { getAudioFile } from '@/features/tracks/lib/utils.ts';
import useAudioStore from '@/store/use-audio-store.ts';

const useAudioController = () => {
  const [duration, setDuration] = useState(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const currentTime = useAudioStore((state) => state.currentTime);
  const volume = useAudioStore((state) => state.volume);
  const isMuted = useAudioStore((state) => state.isMuted);
  const isPlaying = useAudioStore((state) => state.isPlaying);

  const setGlobalAudioRef = useAudioStore((state) => state.setGlobalAudioRef);
  const togglePlay = useAudioStore((state) => state.togglePlay);
  const previous = useAudioStore((state) => state.previous);
  const next = useAudioStore((state) => state.next);
  const setCurrentTime = useAudioStore((state) => state.setCurrentTime);
  const setVolume = useAudioStore((state) => state.setVolume);
  const toggleMute = useAudioStore((state) => state.toggleMute);
  const getCurrentTrack = useAudioStore((state) => state.getCurrentTrack);

  const currentStoreTrack = getCurrentTrack();
  const audioFile = getAudioFile(currentStoreTrack?.audioFile);

  useEffect(() => {
    if (audioRef.current) {
      setGlobalAudioRef(audioRef.current);
    }
  }, [setGlobalAudioRef]);

  useEffect(() => {
    if (audioRef.current && currentStoreTrack) {
      audioRef.current.src = audioFile!;
      audioRef.current.load();
      if (isPlaying) {
        audioRef.current.play().catch((error) => {
          console.error('Audio playback failed:', error);
        });
      }
    }
  }, [audioFile, currentStoreTrack]);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch((error) => {
          console.error('Audio playback failed:', error);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      audioRef.current.muted = isMuted;
    }
  }, [volume, isMuted]);

  useEffect(() => {
    if (
      audioRef.current &&
      Math.abs(audioRef.current.currentTime - currentTime) > 1
    ) {
      audioRef.current.currentTime = currentTime;
    }
  }, [currentTime]);

  useEffect(() => {
    if (!audioRef.current) return;

    const handleTimeUpdate = () => {
      if (audioRef.current) {
        setCurrentTime(audioRef.current.currentTime);
      }
    };

    const handleEnded = () => {
      next();
    };

    const handleLoadedMetadata = () => {
      if (audioRef.current && !isNaN(audioRef.current.duration)) {
        setDuration(audioRef.current.duration);
      }
    };

    audioRef.current.addEventListener('timeupdate', handleTimeUpdate);
    audioRef.current.addEventListener('ended', handleEnded);
    audioRef.current.addEventListener('loadedmetadata', handleLoadedMetadata);

    if (audioRef.current && !isNaN(audioRef.current.duration)) {
      setDuration(audioRef.current.duration);
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('timeupdate', handleTimeUpdate);
        audioRef.current.removeEventListener('ended', handleEnded);
        audioRef.current.removeEventListener(
          'loadedmetadata',
          handleLoadedMetadata
        );
      }
    };
  }, [next, setCurrentTime]);

  const handleTimeChange = useCallback(
    (newTime: number[]) => {
      setCurrentTime(newTime[0]);
    },
    [setCurrentTime]
  );

  const handleVolumeChange = useCallback(
    (newVolume: number[]) => {
      setVolume(newVolume[0]);
    },
    [setVolume]
  );

  return {
    audioRef,
    currentStoreTrack,
    duration,
    isPlaying,
    togglePlay,
    previous,
    next,
    handleTimeChange,
    handleVolumeChange,
    currentTime,
    setCurrentTime,
    volume,
    setVolume,
    isMuted,
    toggleMute,
  };
};

export default useAudioController;
