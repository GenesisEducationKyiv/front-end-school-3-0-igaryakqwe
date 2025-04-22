import { create } from 'zustand';
import { Track } from '@/types/entities/track.ts';

interface AudioState {
  globalAudioRef: HTMLAudioElement | null;
  queue: Track[];
  currentTrackId: string | null;
  isPlaying: boolean;
  currentTime: number;
  volume: number;
  isMuted: boolean;
}

interface AudioAction {
  setGlobalAudioRef: (ref: HTMLAudioElement | null) => void;
  addToQueue: (track: Track) => void;
  resetQueue: () => void;
  next: () => void;
  previous: () => void;
  togglePlay: () => void;
  setVolume: (volume: number) => void;
  toggleMute: () => void;
  setCurrentTime: (time: number) => void;
  setCurrentTrackId: (trackId: string | null) => void;
  getCurrentTrack: () => Track | null;
}

export const initialValues = {
  globalAudioRef: null,
  queue: [],
  currentTrackId: null,
  isPlaying: false,
  currentTime: 0,
  volume: 0.7,
  isMuted: false,
};

const useAudioStore = create<AudioState & AudioAction>((set, get) => ({
  ...initialValues,

  setGlobalAudioRef: (ref) => set({ globalAudioRef: ref }),

  addToQueue: (track) =>
    set((state) => ({
      queue: [...state.queue, track],
    })),

  resetQueue: () =>
    set({
      queue: [],
      currentTrackId: null,
      isPlaying: false,
      currentTime: 0,
    }),

  next: () => {
    const { queue, currentTrackId } = get();
    if (queue.length === 0) return;

    const currentIndex = queue.findIndex(
      (track) => track.id === currentTrackId
    );
    if (currentIndex === -1) return;

    const nextIndex = (currentIndex + 1) % queue.length;
    const nextTrackId = queue[nextIndex]?.id ?? null;

    set({ currentTrackId: nextTrackId, currentTime: 0 });
  },

  previous: () => {
    const { queue, currentTrackId } = get();
    if (queue.length === 0) return;

    const currentIndex = queue.findIndex(
      (track) => track.id === currentTrackId
    );
    if (currentIndex === -1) return;

    const prevIndex = (currentIndex - 1 + queue.length) % queue.length;
    const prevTrackId = queue[prevIndex]?.id ?? null;

    set({ currentTrackId: prevTrackId, currentTime: 0 });
  },

  togglePlay: () => {
    set((state) => ({
      isPlaying: !state.isPlaying,
    }));
  },

  setVolume: (volume) => {
    set({ volume });
  },

  toggleMute: () => {
    set((state) => ({ isMuted: !state.isMuted }));
  },

  setCurrentTime: (time) => {
    set({ currentTime: time });
  },

  setCurrentTrackId: (trackId) => {
    set({ currentTrackId: trackId });
  },

  getCurrentTrack: () => {
    const { queue, currentTrackId } = get();
    return queue.find((track) => track.id === currentTrackId) ?? null;
  },
}));

export default useAudioStore;
