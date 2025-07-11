import Header from '@/components/header';
import { ScrollArea } from '@/components/ui/scroll-area';
import TracksPage from '@/features/tracks/tracks.page';

const App = () => {
  return (
    <ScrollArea className="h-screen">
      <Header />
      <TracksPage />
    </ScrollArea>
  );
};

export default App;
