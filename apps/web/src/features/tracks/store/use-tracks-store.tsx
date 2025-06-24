import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface TracksStore {
  isSelectMode: boolean;
  selectedTracksIds: string[];
  setSelectedTracksIds(tracksIds: string[]): void;
  selectTrack: (trackId: string) => void;
  resetSelectedTracksIds: () => void;
  toggleSelectMode: () => void;
}

export const initialValues = {
  isSelectMode: false,
  selectedTracksIds: [],
};

const useTracksStore = create<TracksStore>()(
  persist(
    (set) => ({
      ...initialValues,
      setSelectedTracksIds: (tracksIds) =>
        set({ selectedTracksIds: tracksIds }),
      selectTrack: (trackId) =>
        set((state) => ({
          selectedTracksIds: state.selectedTracksIds.includes(trackId)
            ? state.selectedTracksIds.filter((id) => id !== trackId)
            : [...state.selectedTracksIds, trackId],
        })),
      resetSelectedTracksIds: () => set({ selectedTracksIds: [] }),
      toggleSelectMode: () =>
        set((state) => ({ isSelectMode: !state.isSelectMode })),
    }),
    {
      name: 'tracks-storage',
    }
  )
);

export default useTracksStore;
