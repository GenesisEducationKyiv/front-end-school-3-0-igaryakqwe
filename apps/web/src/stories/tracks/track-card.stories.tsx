import type { Meta, StoryObj } from '@storybook/react-vite';
import { useEffect } from 'react';

import TrackCard from '@/features/tracks/components/track-card';
import useTracksStore from '@/features/tracks/store/use-tracks.store';
import Providers from '@/providers';
import { Track } from '@/types/entities/track';

// Mock track data
const mockTrackWithAudio: Track = {
  id: '1',
  title: 'Bohemian Rhapsody',
  artist: 'Queen',
  album: 'A Night at the Opera',
  genres: ['Rock', 'Progressive Rock'],
  slug: 'bohemian-rhapsody',
  coverImage:
    'https://cdn.prod.website-files.com/62d84e447b4f9e7263d31e94/6399a4d27711a5ad2c9bf5cd_ben-sweet-2LowviVHZ-E-unsplash-1.jpeg',
  audioFile: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
  createdAt: '2021-01-01T00:00:00.000Z',
  updatedAt: '2021-01-01T00:00:00.000Z',
};

const mockTrackWithoutAudio: Track = {
  id: '2',
  title: 'Imagine',
  artist: 'John Lennon',
  album: 'Imagine',
  genres: ['Pop', 'Soft Rock'],
  slug: 'imagine',
  coverImage:
    'https://cdn.prod.website-files.com/62d84e447b4f9e7263d31e94/6399a4d27711a5ad2c9bf5cd_ben-sweet-2LowviVHZ-E-unsplash-1.jpeg',
  audioFile: null,
  createdAt: '2021-01-02T00:00:00.000Z',
  updatedAt: '2021-01-02T00:00:00.000Z',
};

const mockTrackWithoutCover: Track = {
  id: '3',
  title: 'Hotel California',
  artist: 'Eagles',
  album: 'Hotel California',
  genres: ['Rock', 'Soft Rock'],
  slug: 'hotel-california',
  coverImage: null,
  audioFile: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
  createdAt: '2021-01-03T00:00:00.000Z',
  updatedAt: '2021-01-03T00:00:00.000Z',
};

const mockTrackMinimal: Track = {
  id: '4',
  title: 'Stairway to Heaven',
  artist: 'Led Zeppelin',
  album: null,
  genres: ['Rock', 'Hard Rock'],
  slug: 'stairway-to-heaven',
  coverImage: null,
  audioFile: null,
  createdAt: '2021-01-04T00:00:00.000Z',
  updatedAt: undefined,
};

// Wrapper component to control store state
const TrackCardWrapper = ({
  track,
  isSelectMode = false,
  selectedTracksIds = [],
}: {
  track: Track;
  isSelectMode?: boolean;
  selectedTracksIds?: string[];
}) => {
  const { toggleSelectMode, setSelectedTracksIds } = useTracksStore();

  useEffect(() => {
    // Set initial store state
    if (isSelectMode) {
      toggleSelectMode();
    }
    if (selectedTracksIds.length > 0) {
      setSelectedTracksIds(selectedTracksIds);
    }
  }, [isSelectMode, selectedTracksIds, toggleSelectMode, setSelectedTracksIds]);

  return (
    <Providers>
      <TrackCard track={track} className="max-w-[280px]" />
    </Providers>
  );
};

const meta = {
  title: 'features/tracks/TrackCard',
  component: TrackCardWrapper,
  tags: ['autodocs'],
  argTypes: {
    track: {
      control: 'object',
      description: 'Track data object',
    },
    isSelectMode: {
      control: 'boolean',
      description: 'Whether the tracks list is in select mode',
    },
    selectedTracksIds: {
      control: 'object',
      description: 'Array of selected track IDs',
    },
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A card component that displays track information with audio controls and actions.',
      },
    },
  },
} satisfies Meta<typeof TrackCardWrapper>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    track: mockTrackWithAudio,
  },
};

export const WithoutAudio: Story = {
  args: {
    track: mockTrackWithoutAudio,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Track card without audio file - shows upload component instead of audio controls.',
      },
    },
  },
};

export const WithoutCoverImage: Story = {
  args: {
    track: mockTrackWithoutCover,
  },
  parameters: {
    docs: {
      description: {
        story: 'Track card without cover image - shows default placeholder.',
      },
    },
  },
};

export const MinimalTrack: Story = {
  args: {
    track: mockTrackMinimal,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Track card with minimal data - no album, no cover image, no audio file.',
      },
    },
  },
};

export const LongTitle: Story = {
  args: {
    track: {
      ...mockTrackWithAudio,
      title:
        'This is a very long track title that might overflow and need to be handled properly in the UI',
      artist: 'Artist with a very long name that might also overflow',
      album:
        'Album with a very long name that might also overflow and cause layout issues',
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          'Track card with long text content to test text overflow handling.',
      },
    },
  },
};

export const ManyGenres: Story = {
  args: {
    track: {
      ...mockTrackWithAudio,
      genres: [
        'Rock',
        'Pop',
        'Jazz',
        'Blues',
        'Electronic',
        'Folk',
        'Country',
        'Hip Hop',
      ],
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          'Track card with many genres to test genre display and overflow.',
      },
    },
  },
};
