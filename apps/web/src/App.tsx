import Header from '@/components/header';
import TracksPage from '@/features/tracks/tracks.page.tsx';
import { ScrollArea } from '@/components/ui/scroll-area.tsx';

const App = () => {
  return (
    <ScrollArea className="h-screen">
      <Header />
      <TracksPage />
    </ScrollArea>
  );
};

export default App;
