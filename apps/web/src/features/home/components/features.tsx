import {
  HeadphonesIcon,
  LibraryIcon,
  MusicIcon,
  SearchIcon,
  UploadIcon,
  ZapIcon,
} from 'lucide-react';

import { Card, CardContent } from '@/components/ui/card';
import { Container } from '@/components/ui/container';

const features = [
  {
    name: 'Smart Music Library',
    description:
      'Organize your tracks by artist, album, genre, and custom tags. Advanced metadata management keeps everything perfectly sorted.',
    icon: LibraryIcon,
    color: 'text-blue-600 bg-foreground/5',
  },
  {
    name: 'Powerful Search',
    description:
      'Find any track instantly with our advanced search engine. Search by title, artist, album, or even lyrics.',
    icon: SearchIcon,
    color: 'text-purple-600 bg-foreground/5',
  },
  {
    name: 'High-Quality Audio',
    description:
      'Experience crystal-clear audio with support for lossless formats and advanced audio processing.',
    icon: HeadphonesIcon,
    color: 'text-orange-600 bg-foreground/5',
  },
  {
    name: 'Easy Upload',
    description:
      'Drag and drop your music files with automatic metadata extraction and duplicate detection.',
    icon: UploadIcon,
    color: 'text-red-600 bg-foreground/5',
  },
  {
    name: 'Lightning Fast',
    description:
      'Built for performance with instant search results and smooth playback transitions.',
    icon: ZapIcon,
    color: 'text-yellow-600 bg-foreground/5',
  },
  {
    name: 'Music Discovery',
    description:
      'Discover new tracks based on your listening habits and explore similar artists and genres.',
    icon: MusicIcon,
    color: 'text-teal-600 bg-foreground/5',
  },
];

export function Features() {
  return (
    <section className="py-10">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-base font-semibold leading-7 text-primary">
            Everything you need
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Powerful music management
          </p>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Built with modern technology to handle your entire music collection
            with ease and precision.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-7xl">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <Card
                key={feature.name}
                className="border-0 shadow-sm hover:shadow-md transition-shadow"
              >
                <CardContent className="p-6">
                  <div
                    className={`inline-flex h-12 w-12 items-center justify-center rounded-lg ${feature.color}`}
                  >
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-foreground">
                    {feature.name}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
