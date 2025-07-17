'use client';

import { Play } from 'lucide-react';
import Link from 'next/link';
import { Suspense } from 'react';

import { buttonVariants } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { ROUTES } from '@/constants/routes';
import TrackSection from '@/features/home/components/track-section';
import TrackCardSkeleton from '@/features/tracks/components/track-card-skeleton';

const Hero = () => {
  return (
    <section className="relative overflow-hidden py-10 sm:py-16">
      <div className="absolute inset-0"></div>
      <Container className="relative">
        <div className="mx-auto max-w-6xl flex flex-col md:flex-row items-center gap-10 md:gap-20">
          <div className="flex-1 text-center md:text-left">
            <div className="mb-8 inline-flex items-center rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary ring-1 ring-inset ring-primary/10">
              <span>🎵 New audio streaming platform</span>
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
              Your music library,{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                reimagined
              </span>
            </h1>
            <p className="mx-auto md:mx-0 mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
              Upload, organize, and stream your music collection with powerful
              search, smart filtering, and high-quality audio playback. Built
              for music lovers who demand more.
            </p>
            <div className="mt-10 flex items-center justify-center md:justify-start gap-x-6">
              <Link
                href={ROUTES.tracks}
                className={buttonVariants({ size: 'lg' })}
              >
                <Play className="mr-2 h-4 w-4" />
                Start Listening
              </Link>
            </div>
          </div>
          <div className="flex justify-center">
            <Suspense fallback={<TrackCardSkeleton className="w-[300px]" />}>
              <TrackSection />
            </Suspense>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Hero;
