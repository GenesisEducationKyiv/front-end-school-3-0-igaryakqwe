import { ChevronsUpDown, Loader } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import useGenreQuery from '@/features/tracks/hooks/use-genre-query.ts';
import useTracksSearch from '@/features/tracks/hooks/use-tracks-search.ts';
import { useState } from 'react';

const GenresCombobox = () => {
  const [open, setOpen] = useState(false);
  const { genre, setGenre } = useTracksSearch();

  const { genres, isLoading } = useGenreQuery();

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          data-testid="filter-genre"
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {genre
            ? genres?.find((genreItem) => genreItem === genre)
            : 'All genres'}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search genre..." />
          <CommandList>
            <CommandEmpty>
              {isLoading ? (
                <div className="flex items-center justify-center w-full h-full">
                  <Loader className="mr-2 h-5 w-5 animate-spin" />
                </div>
              ) : (
                <div className="flex items-center justify-center w-full h-full">
                  No genres found.
                </div>
              )}
            </CommandEmpty>
            <CommandGroup>
              <CommandItem
                value=""
                className={cn(genre === '' && 'font-semibold bg-gray-100')}
                onSelect={(currentValue) => {
                  setGenre(currentValue);
                  setOpen(false);
                }}
              >
                All genres
              </CommandItem>
              {genres?.map((genreItem) => (
                <CommandItem
                  key={genreItem}
                  value={genreItem}
                  className={cn(
                    genre === genreItem && 'font-semibold bg-gray-100'
                  )}
                  onSelect={(currentValue) => {
                    setGenre(currentValue === genre ? '' : currentValue);
                    setOpen(false);
                  }}
                >
                  {genreItem}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default GenresCombobox;
