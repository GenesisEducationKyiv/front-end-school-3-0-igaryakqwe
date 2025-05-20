import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { CreateTrackDto, createTrackDto } from '@/api/dto/tracks.dto.ts';
import { Button } from '@/components/ui/button.tsx';
import { Input } from '@/components/ui/input.tsx';
import { Label } from '@/components/ui/label.tsx';
import MultipleSelector, { Option } from '@/components/ui/multiselect.tsx';
import TrackImage from '@/features/tracks/components/track-image.tsx';
import useGenreQuery from '@/features/tracks/hooks/use-genre-query.ts';
import useCreateTrackMutation from '@/features/tracks/hooks/use-create-track-mutation.ts';
import useUpdateTrackMutation from '@/features/tracks/hooks/use-update-track-mutation.ts';
import { mapGenre } from '@/features/tracks/lib/utils.ts';
import { Track } from '@/types/entities/track.ts';

interface CreateTrackFormProps {
  onClose: () => void;
  isEdit?: boolean;
  track?: Track;
}

const TrackForm = ({ onClose, isEdit, track }: CreateTrackFormProps) => {
  const { genres: genresData } = useGenreQuery();
  const createTrackMutation = useCreateTrackMutation();
  const updateTrackMutation = useUpdateTrackMutation();
  
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(createTrackDto),
    defaultValues: {
      title: track?.title ?? '',
      artist: track?.artist ?? '',
      album: track?.album ?? '',
      coverImage: track?.coverImage ?? '',
      genres: track?.genres ?? [],
    },
  });

  const genreOptions = mapGenre(genresData);

  const genres = watch('genres');
  const image = watch('coverImage');

  const handleSelectGenre = (options: Option[]) => {
    setValue(
      'genres',
      options.map((option) => option.value)
    );
  };

  const onSubmit = (data: CreateTrackDto) => {
      if (isEdit && track) {
        updateTrackMutation.mutate({ id: track.id, data });
      } else {
        createTrackMutation.mutate(data);
      }
      onClose();
  };

  return (
    <form
      data-testid="track-form"
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-2 px-1"
    >
      <div className="w-64 self-center">
        <TrackImage image={image} alt="Track image" />
      </div>
      <Input
        id="cover-image"
        data-testid="input-cover-image"
        label="Image URL"
        placeholder="Provide image URL"
        error={errors.coverImage?.message}
        {...register('coverImage')}
      />
      <Input
        id="title"
        data-testid="input-title"
        label="Title"
        error={errors.title?.message}
        placeholder="Enter task title"
        {...register('title')}
      />
      <Input
        id="artist"
        data-testid="input-artist"
        label="Artist"
        error={errors.artist?.message}
        placeholder="Enter task artist"
        {...register('artist')}
      />
      <Input
        id="album"
        data-testid="input-album"
        label="Album"
        error={errors.album?.message}
        placeholder="Enter task album"
        {...register('album')}
      />
      <div className="*:not-first:mt-2">
        <Label>Genre</Label>
        <MultipleSelector
          value={mapGenre(genres)}
          defaultOptions={genreOptions}
          onChange={handleSelectGenre}
          placeholder="Select genres"
          hideClearAllButton
          hidePlaceholderWhenSelected
          emptyIndicator={
            <p className="text-center text-sm">No results found</p>
          }
        />
        {errors.genres && (
          <p data-testid="error-genres" className="text-sm text-red-500">
            {errors.genres.message}
          </p>
        )}
      </div>
      <div className="self-end mt-4 space-x-2">
        <Button type="button" variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button
          data-testid="submit-button"
          type="submit"
          disabled={isSubmitting}
        >
          {isEdit ? 'Update' : 'Create'}
        </Button>
      </div>
    </form>
  );
};

export default TrackForm;
