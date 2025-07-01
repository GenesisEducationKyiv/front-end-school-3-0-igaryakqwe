import { ChevronsUpDown } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import useTracksSearch from '@/features/tracks/hooks/use-tracks-search';
import { SORT_VALUES } from '@/features/tracks/lib/constants';
import { getSortValue } from '@/features/tracks/lib/utils';
import { cn } from '@/lib/utils';
import { SortValue } from '@/types/entities/track';

const SortCombobox = () => {
  const [open, setOpen] = useState(false);
  const {
    state: { sort },
    actions: { setSort },
  } = useTracksSearch();

  const handleSelect = async (value?: SortValue) => {
    if (!value) {
      await setSort(null);
      setOpen(false);
      return;
    }
    await setSort(value);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          data-testid="sort-select"
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {getSortValue(sort)}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandList>
            <CommandGroup>
              {SORT_VALUES?.map((sortValue: SortValue) => (
                <CommandItem
                  key={sortValue}
                  value={sortValue}
                  className={cn(
                    sort === sortValue &&
                      'font-semibold bg-gray-100 dark:neutral-800'
                  )}
                  onSelect={() => handleSelect(sortValue)}
                >
                  {getSortValue(sortValue)}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default SortCombobox;
