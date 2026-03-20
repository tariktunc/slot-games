import Link from 'next/link';

interface GameCardProps {
  href: string;
  icon: string;
  name: string;
  provider: string;
  rtp: string;
  badge?: string;
  gradient: string;
}

export default function GameCard({ href, icon, name, provider, rtp, badge, gradient }: GameCardProps) {
  return (
    <Link href={href} className="group block bg-bet-card border border-bet-border rounded-xl overflow-hidden hover:border-bet-border-l transition-all duration-200 hover:-translate-y-0.5">
      {/* Image Area */}
      <div className={`relative h-40 ${gradient} flex items-center justify-center overflow-hidden`}>
        <span className="text-7xl group-hover:scale-110 transition-transform duration-300 drop-shadow-lg">{icon}</span>
        {badge && (
          <span className={`absolute top-2 left-2 text-[10px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wide ${
            badge === 'HOT' ? 'bg-bet-red text-white' :
            badge === 'YENİ' ? 'bg-bet-accent text-black' :
            'bg-bet-gold text-black'
          }`}>
            {badge}
          </span>
        )}
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200 flex items-center justify-center">
          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-bet-accent text-black font-bold text-sm px-4 py-1.5 rounded-full">
            OYNA
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="p-3">
        <p className="text-bet-text font-semibold text-sm truncate">{name}</p>
        <p className="text-bet-muted text-xs mt-0.5">{provider}</p>
        <div className="flex items-center justify-between mt-2">
          <span className="text-bet-accent text-xs font-semibold">RTP {rtp}</span>
          <span className="text-bet-muted text-[10px]">min ⬡10</span>
        </div>
      </div>
    </Link>
  );
}
