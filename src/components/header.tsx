'use client';

import { cn } from '@/lib/utils';
import Logo from '@/components/logo';

const Header = () => {
  return (
    <header>
      <nav
        className={cn(
          'sticky z-20 w-full border-b transition-colors duration-150'
        )}
      >
        <div className="mx-auto max-w-7xl px-6">
          <div className="relative flex flex-wrap items-center justify-center gap-6 py-3 lg:gap-0 lg:py-4">
            <a
              href="/"
              aria-label="home"
              className="flex items-center space-x-2"
            >
              <Logo />
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
