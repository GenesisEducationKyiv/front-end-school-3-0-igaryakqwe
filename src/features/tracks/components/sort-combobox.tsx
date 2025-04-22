import { useState } from 'react';
import useTracksSearch from '@/features/tracks/hooks/use-tracks-search.ts';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover.tsx';
import { Button } from '@/components/ui/button.tsx';
import { ChevronsUpDown } from 'lucide-react';
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from '@/components/ui/command.tsx';
import { cn } from '@/lib/utils.ts';
import { SORT_VALUES } from '@/features/tracks/lib/constants.ts';
import { getSortValue } from '@/features/tracks/lib/utils.ts';
import { SortValue } from '@/types/entities/track.ts';

const SortCombobox = () => {
  const [open, setOpen] = useState(false);
  const { sort, setSort } = useTracksSearch();

  const handleSelect = async (value?: SortValue) => {
    if (!value) {
      await setSort(null);
      setOpen(false);
      return;
    }
    await setSort(value);
    setOpen(false);
  };

  const currentSortValue = SORT_VALUES?.find((valueItem) => valueItem === sort);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {getSortValue(currentSortValue)}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandList>
            <CommandGroup>
              <CommandItem
                className={cn(!sort && 'font-semibold bg-gray-100')}
                onSelect={() => handleSelect()}
              >
                <span className="text-sm">No sorting</span>
              </CommandItem>
              {SORT_VALUES?.map((sortValue: SortValue) => (
                <CommandItem
                  key={sortValue}
                  value={sortValue}
                  className={cn(
                    sort === sortValue && 'font-semibold bg-gray-100'
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
