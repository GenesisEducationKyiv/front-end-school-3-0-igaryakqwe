import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import ChangeOrderButton from '@/features/tracks/components/change-order-button';
import GenresCombobox from '@/features/tracks/components/genres-combobox';
import SortCombobox from '@/features/tracks/components/sort-combobox';
import useTrackFiltersConfigs from '@/features/tracks/hooks/use-track-filters-configs';

const TracksFilters = () => {
  const inputConfigs = useTrackFiltersConfigs();

  return (
    <Card className="w-full lg:w-1/3 p-5 h-fit">
      <CardTitle className="text-2xl">Filters</CardTitle>
      <CardContent className="p-0 space-y-2">
        {inputConfigs.map((config) => (
          <Input
            key={config.label}
            label={config.label}
            value={config.value}
            placeholder={config.placeholder}
            onChange={config.onChange}
            data-testId={config.testId}
          />
        ))}
        <div>
          <Label className="text-sm font-medium">Select Genre</Label>
          <GenresCombobox />
        </div>
        <div className="flex items-end w-full gap-2">
          <div className="w-full">
            <Label className="text-sm font-medium">Sort By</Label>
            <SortCombobox />
          </div>
          <ChangeOrderButton />
        </div>
      </CardContent>
    </Card>
  );
};

export default TracksFilters;
