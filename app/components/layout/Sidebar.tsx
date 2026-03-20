'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTokens } from '../../contexts/TokenContext';

const CATEGORIES = [
  { href: '/',                label: 'Casino Lobisi',  icon: '🏠', section: null },
  { href: '/games/slot',      label: 'Slotlar',        icon: '🎰', section: 'Oyunlar' },
  { href: '/games/roulette',  label: 'Rulet',          icon: '🎡', section: null },
  { href: '/games/blackjack', label: 'Blackjack',      icon: '🃏', section: null },
  { href: '/games/crash',     label: 'Crash',          icon: '🚀', section: null },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { tokens } = useTokens();

  return (
    <aside className="hidden lg:flex flex-col w-56 shrink-0 bg-bet-surface border-r border-bet-border min-h-0">
      <nav className="flex-1 overflow-y-auto py-3 px-2">
        {CATEGORIES.map((item, i) => {
          const isActive = pathname === item.href;
          const showSection = item.section && (i === 0 || CATEGORIES[i - 1].section !== item.section);

          return (
            <div key={item.href}>
              {showSection && (
                <p className="text-bet-muted text-[11px] uppercase tracking-wider font-semibold px-3 py-2 mt-2">
                  {item.section}
                </p>
              )}
              <Link
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded text-sm font-medium transition-all group relative ${
                  isActive
                    ? 'text-bet-text bg-bet-card'
                    : 'text-bet-muted hover:text-bet-text hover:bg-bet-card/60'
                }`}
              >
                {isActive && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-bet-accent rounded-r" />
                )}
                <span className="text-base">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            </div>
          );
        })}
      </nav>

      {/* Bottom: Balance Card */}
      <div className="p-3 border-t border-bet-border">
        <div className="bg-bet-card rounded-lg p-3 border border-bet-border">
          <p className="text-bet-muted text-xs mb-1">Bakiyeniz</p>
          <p className="text-bet-text font-bold text-lg tabular-nums flex items-center gap-1">
            <span className="text-bet-gold text-sm">⬡</span>
            {tokens.toLocaleString('tr-TR')}
            <span className="text-bet-muted text-xs font-normal">TKN</span>
          </p>
        </div>
        <p className="text-bet-muted text-[10px] text-center mt-3">18+ · Sorumlu Oyun</p>
      </div>
    </aside>
  );
}
