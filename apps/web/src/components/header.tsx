import Logo from '@/components/logo';
import { ThemeToggle } from '@/components/theme-toggle';
import { cn } from '@/lib/utils';

const Header = () => {
  return (
    <header
      data-testid="tracks-header"
      className="sticky top-0 z-50 bg-sidebar shadow-sm"
    >
      <nav className={cn('w-full border-b transition-colors duration-150')}>
        <div className="mx-auto max-w-7xl px-6">
          <div className="relative flex flex-wrap items-center justify-center gap-6 py-3 lg:gap-0 lg:py-4">
            <a
              data-testid="logo-link"
              href="/"
              aria-label="home"
              className="flex items-center space-x-2"
            >
              <Logo />
            </a>
            <ThemeToggle className="absolute right-0" />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
