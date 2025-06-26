import { create } from 'zustand';

export interface ActiveTrackData {
  id: string;
  title: string;
}

interface TrackState {
  activeTrack: ActiveTrackData | null;
  setActiveTrack: (track: ActiveTrackData | null) => void;
}

const initialValues = {
  activeTrack: null,
};

const useTrackStore = create<TrackState>((set) => ({
  ...initialValues,
  setActiveTrack: (track) => set({ activeTrack: track }),
}));

export default useTrackStore;
