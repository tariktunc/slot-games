'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const TABS = [
  { href: '/',                label: 'Ana',        icon: '🏠' },
  { href: '/games/slot',      label: 'Slotlar',    icon: '🎰' },
  { href: '/games/roulette',  label: 'Rulet',      icon: '🎡' },
  { href: '/games/blackjack', label: 'Blackjack',  icon: '🃏' },
  { href: '/games/crash',     label: 'Crash',      icon: '🚀' },
];

export default function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-bet-surface border-t border-bet-border">
      <ul className="flex">
        {TABS.map(tab => {
          const isActive = pathname === tab.href;
          return (
            <li key={tab.href} className="flex-1 relative">
              {isActive && (
                <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-bet-accent rounded-b" />
              )}
              <Link
                href={tab.href}
                className={`flex flex-col items-center justify-center py-2 gap-0.5 text-[11px] font-medium transition-colors ${
                  isActive ? 'text-bet-accent' : 'text-bet-muted hover:text-bet-text'
                }`}
              >
                <span className="text-lg leading-none">{tab.icon}</span>
                <span>{tab.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
