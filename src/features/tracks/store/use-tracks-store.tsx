import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface TracksStore {
  selectedTracksIds: string[];
  setSelectedTracksIds(tracksIds: string[]): void;
  selectTrack: (trackId: string) => void;
  resetSelectedTracksIds: () => void;
}

const useTracksStore = create<TracksStore>()(
  persist(
    (set) => ({
      selectedTracksIds: [],
      setSelectedTracksIds: (tracksIds) =>
        set({ selectedTracksIds: tracksIds }),
      selectTrack: (trackId) =>
        set((state) => ({
          selectedTracksIds: state.selectedTracksIds.includes(trackId)
            ? state.selectedTracksIds.filter((id) => id !== trackId)
            : [...state.selectedTracksIds, trackId],
        })),
      resetSelectedTracksIds: () => set({ selectedTracksIds: [] }),
    }),
    {
      name: 'tracks-storage',
    }
  )
);

export default useTracksStore;
