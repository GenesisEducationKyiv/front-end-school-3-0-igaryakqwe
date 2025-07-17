'use client';

import dynamic from 'next/dynamic';
import { PropsWithChildren } from 'react';

import useAudioController from '@/features/tracks/hooks/use-audio-controller';

const AudioSnackbar = dynamic(
  () => import('@/components/audio/audio-snackbar'),
  { ssr: false }
);

const AudioProvider = ({ children }: PropsWithChildren) => {
  const { currentStoreTrack } = useAudioController();

  return (
    <>
      {children}
      {currentStoreTrack && <AudioSnackbar />}
    </>
  );
};

export default AudioProvider;
