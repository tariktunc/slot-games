'use client';

import { useState } from 'react';
import { useTokens } from '../../../contexts/TokenContext';
import styles from './Blackjack.module.css';

type Card = { suit: string; rank: string; value: number };
type GameState = 'idle' | 'playing' | 'done';

const SUITS = ['♠', '♥', '♦', '♣'];
const RANKS = ['A','2','3','4','5','6','7','8','9','10','J','Q','K'];
const VALUES: Record<string, number> = {
  'A': 11, '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7,
  '8': 8, '9': 9, '10': 10, 'J': 10, 'Q': 10, 'K': 10,
};

function buildDeck(): Card[] {
  const deck: Card[] = [];
  for (const suit of SUITS)
    for (const rank of RANKS)
      deck.push({ suit, rank, value: VALUES[rank] });
  return deck.sort(() => Math.random() - 0.5);
}

function handValue(hand: Card[]): number {
  let total = hand.reduce((s, c) => s + c.value, 0);
  let aces = hand.filter(c => c.rank === 'A').length;
  while (total > 21 && aces > 0) { total -= 10; aces--; }
  return total;
}

function CardDisplay({ card, hidden }: { card: Card; hidden?: boolean }) {
  const isRed = card.suit === '♥' || card.suit === '♦';
  if (hidden) return <div className={styles.card}><span className={styles.cardBack}>🂠</span></div>;
  return (
    <div className={`${styles.card} ${isRed ? styles.cardRed : styles.cardBlack}`}>
      <span className={styles.cardRank}>{card.rank}</span>
      <span className={styles.cardSuit}>{card.suit}</span>
    </div>
  );
}

export default function Blackjack() {
  const { tokens, spendTokens, addTokens } = useTokens();
  const [deck, setDeck] = useState<Card[]>([]);
  const [playerHand, setPlayerHand] = useState<Card[]>([]);
  const [dealerHand, setDealerHand] = useState<Card[]>([]);
  const [gameState, setGameState] = useState<GameState>('idle');
  const [message, setMessage] = useState('');
  const [won, setWon] = useState<boolean | null>(null);
  const [bet, setBet] = useState(20);
  const [dealerRevealed, setDealerRevealed] = useState(false);

  const startGame = () => {
    if (!spendTokens(bet)) return;
    const newDeck = buildDeck();
    const p = [newDeck.pop()!, newDeck.pop()!];
    const d = [newDeck.pop()!, newDeck.pop()!];
    setDeck(newDeck);
    setPlayerHand(p);
    setDealerHand(d);
    setGameState('playing');
    setMessage('');
    setWon(null);
    setDealerRevealed(false);

    // Check immediate blackjack
    if (handValue(p) === 21) {
      revealAndEnd(newDeck, p, d, true);
    }
  };

  const revealAndEnd = (d: Card[], p: Card[], dealer: Card[], playerBJ = false) => {
    setDealerRevealed(true);
    let currentDealer = [...dealer];
    let currentDeck = [...d];

    // Dealer draws to 17+
    while (handValue(currentDealer) < 17) {
      currentDealer.push(currentDeck.pop()!);
    }
    setDealerHand(currentDealer);
    setDeck(currentDeck);
    setGameState('done');

    const pVal = handValue(p);
    const dVal = handValue(currentDealer);

    if (playerBJ) {
      addTokens(Math.floor(bet * 2.5));
      setMessage(`BLACKJACK! +${Math.floor(bet * 2.5)} token 🃏🎉`);
      setWon(true);
    } else if (pVal > 21) {
      setMessage('Bust! El geçti. Şansını tekrar dene!');
      setWon(false);
    } else if (dVal > 21 || pVal > dVal) {
      addTokens(bet * 2);
      setMessage(`Kazandın! +${bet * 2} token 🎉`);
      setWon(true);
    } else if (pVal === dVal) {
      addTokens(bet);
      setMessage('Beraberlik — bahsin iade edildi.');
      setWon(null);
    } else {
      setMessage('Kaybettin. Tekrar dene!');
      setWon(false);
    }
  };

  const hit = () => {
    if (gameState !== 'playing') return;
    const newCard = deck[deck.length - 1];
    const newDeck = deck.slice(0, -1);
    const newHand = [...playerHand, newCard];
    setDeck(newDeck);
    setPlayerHand(newHand);

    if (handValue(newHand) > 21) {
      setDealerRevealed(true);
      setGameState('done');
      setMessage('Bust! El geçti.');
      setWon(false);
    }
  };

  const stand = () => {
    if (gameState !== 'playing') return;
    revealAndEnd(deck, playerHand, dealerHand);
  };

  const doubleDown = () => {
    if (gameState !== 'playing' || playerHand.length !== 2 || !spendTokens(bet)) return;
    const newCard = deck[deck.length - 1];
    const newDeck = deck.slice(0, -1);
    const newHand = [...playerHand, newCard];
    setDeck(newDeck);
    setPlayerHand(newHand);

    if (handValue(newHand) > 21) {
      setDealerRevealed(true);
      setGameState('done');
      setMessage('Bust! El geçti.');
      setWon(false);
    } else {
      revealAndEnd(newDeck, newHand, dealerHand);
    }
  };

  const pVal = handValue(playerHand);
  const dVal = dealerRevealed ? handValue(dealerHand) : '?';

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Blackjack</h1>

      {gameState === 'idle' && (
        <div className={styles.startArea}>
          <div className={styles.betRow}>
            <span className={styles.label}>Bahis:</span>
            {[20, 50, 100, 200].map(v => (
              <button key={v} onClick={() => setBet(v)} className={`${styles.chipBtn} ${bet === v ? styles.chipActive : ''}`}>
                ⬡ {v}
              </button>
            ))}
          </div>
          <button className={styles.primaryBtn} onClick={startGame} disabled={tokens < bet}>
            Kart Dağıt — ⬡{bet}
          </button>
        </div>
      )}

      {gameState !== 'idle' && (
        <>
          {/* Dealer */}
          <div className={styles.handSection}>
            <div className={styles.handLabel}>Krupiye ({dVal})</div>
            <div className={styles.hand}>
              {dealerHand.map((card, i) => (
                <CardDisplay key={i} card={card} hidden={!dealerRevealed && i === 1} />
              ))}
            </div>
          </div>

          <div className={styles.divider}>—— VS ——</div>

          {/* Player */}
          <div className={styles.handSection}>
            <div className={styles.handLabel}>Sen ({pVal})</div>
            <div className={styles.hand}>
              {playerHand.map((card, i) => (
                <CardDisplay key={i} card={card} />
              ))}
            </div>
          </div>

          {/* Actions */}
          {gameState === 'playing' && (
            <div className={styles.actions}>
              <button className={styles.actionBtn} onClick={hit}>Hit</button>
              <button className={styles.actionBtn} onClick={stand}>Stand</button>
              {playerHand.length === 2 && tokens >= bet && (
                <button className={styles.actionBtn} onClick={doubleDown}>Double Down</button>
              )}
            </div>
          )}

          {gameState === 'done' && (
            <div className={styles.actions}>
              <button className={styles.primaryBtn} onClick={() => setGameState('idle')}>
                Yeni El Oyna
              </button>
            </div>
          )}

          {message && (
            <div className={`${styles.message} ${won === true ? styles.win : won === false ? styles.lose : styles.draw}`}>
              {message}
            </div>
          )}
        </>
      )}
    </div>
  );
}
