import { useEffect, useRef } from 'react';
import useAudioStore from '@/store/use-audio-store';

export const GlobalAudioProvider = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const setGlobalAudioRef = useAudioStore((state) => state.setGlobalAudioRef);
  const currentTrack = useAudioStore((state) => state.getCurrentTrack());
  const isPlaying = useAudioStore((state) => state.isPlaying);
  const currentTime = useAudioStore((state) => state.currentTime);
  const volume = useAudioStore((state) => state.volume);
  const isMuted = useAudioStore((state) => state.isMuted);
  const setCurrentTime = useAudioStore((state) => state.setCurrentTime);

  // Initialize global audio ref
  useEffect(() => {
    // Create audio element if it doesn't exist
    if (!audioRef.current) {
      audioRef.current = new Audio();
      setGlobalAudioRef(audioRef.current);
    }

    // Cleanup on unmount
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
        setGlobalAudioRef(null);
      }
    };
  }, [setGlobalAudioRef]);

  // Handle track changes
  useEffect(() => {
    if (audioRef.current && currentTrack) {
      audioRef.current.src = currentTrack.audioFile;
      audioRef.current.load();
      if (isPlaying) {
        audioRef.current.play();
      }
    }
  }, [currentTrack, isPlaying]);

  // Handle play/pause
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

  // Handle time changes
  useEffect(() => {
    if (
      audioRef.current &&
      Math.abs(audioRef.current.currentTime - currentTime) > 1
    ) {
      audioRef.current.currentTime = currentTime;
    }
  }, [currentTime]);

  // Handle volume changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      audioRef.current.muted = isMuted;
    }
  }, [volume, isMuted]);

  // Update current time in store as audio plays
  useEffect(() => {
    if (!audioRef.current) return;

    const handleTimeUpdate = () => {
      if (audioRef.current) {
        setCurrentTime(audioRef.current.currentTime);
      }
    };

    const handleEnded = () => {
      useAudioStore.getState().next();
    };

    audioRef.current.addEventListener('timeupdate', handleTimeUpdate);
    audioRef.current.addEventListener('ended', handleEnded);

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('timeupdate', handleTimeUpdate);
        audioRef.current.removeEventListener('ended', handleEnded);
      }
    };
  }, [setCurrentTime]);

  // This component doesn't render anything visible
  return null;
};

export default GlobalAudioProvider;
