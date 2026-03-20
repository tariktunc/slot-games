'use client';

import { useState, useEffect, useRef } from 'react';
import { useTokens } from '../../../contexts/TokenContext';
import styles from './CrashGame.module.css';

type Phase = 'betting' | 'running' | 'crashed' | 'cashed';

function generateCrashPoint(): number {
  // House edge ~5%, min crash 1.00x
  const r = Math.random();
  if (r < 0.05) return 1.00;
  return Math.max(1.00, parseFloat((1 / (1 - r) * 0.95).toFixed(2)));
}

export default function CrashGame() {
  const { tokens, spendTokens, addTokens } = useTokens();
  const [phase, setPhase] = useState<Phase>('betting');
  const [bet, setBet] = useState(10);
  const [multiplier, setMultiplier] = useState(1.00);
  const [crashPoint, setCrashPoint] = useState(1.00);
  const [message, setMessage] = useState('');
  const [autoCashOut, setAutoCashOut] = useState('');
  const rafRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);
  const crashRef = useRef<number>(1.00);

  const startGame = () => {
    if (!spendTokens(bet)) return;
    const cp = generateCrashPoint();
    setCrashPoint(cp);
    crashRef.current = cp;
    setMultiplier(1.00);
    setMessage('');
    setPhase('running');
    startTimeRef.current = performance.now();

    const tick = (now: number) => {
      const elapsed = (now - startTimeRef.current) / 1000;
      // Multiplier grows exponentially: e^(0.06 * elapsed)
      const m = parseFloat(Math.pow(Math.E, 0.06 * elapsed).toFixed(2));
      setMultiplier(m);

      const autoVal = parseFloat(autoCashOut);
      if (!isNaN(autoVal) && autoVal >= 1.01 && m >= autoVal) {
        doCashOut(m);
        return;
      }

      if (m >= crashRef.current) {
        setPhase('crashed');
        setMultiplier(crashRef.current);
        setMessage(`Uçak düştü! ${crashRef.current.toFixed(2)}x — Bahsin kaybedildi.`);
        return;
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
  };

  const doCashOut = (m: number) => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    const winnings = Math.floor(bet * m);
    addTokens(winnings);
    setPhase('cashed');
    setMessage(`Kazandın! +${winnings} token 🎉  (${m.toFixed(2)}x çarpan)`);
  };

  const handleCashOut = () => {
    if (phase !== 'running') return;
    doCashOut(multiplier);
  };

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const reset = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    setPhase('betting');
    setMultiplier(1.00);
    setMessage('');
  };

  const isCrashed = phase === 'crashed';
  const isCashed = phase === 'cashed';
  const isRunning = phase === 'running';

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Crash</h1>

      {/* Multiplier Display */}
      <div className={`${styles.multiplierDisplay} ${isCrashed ? styles.crashed : isCashed ? styles.cashed : isRunning ? styles.running : ''}`}>
        <span className={styles.multiplierValue}>
          {isRunning || isCrashed || isCashed ? `${multiplier.toFixed(2)}x` : '—'}
        </span>
        {isCrashed && <div className={styles.crashLabel}>CRASH!</div>}
        {isCashed && <div className={styles.cashLabel}>CASH OUT!</div>}
        <div className={styles.rocketWrapper}>
          <span className={`${styles.rocket} ${isRunning ? styles.rocketFlying : isCrashed ? styles.rocketExploded : ''}`}>
            {isCrashed ? '💥' : '🚀'}
          </span>
        </div>
      </div>

      {phase === 'betting' && (
        <div className={styles.bettingArea}>
          <div className={styles.betRow}>
            <span className={styles.label}>Bahis:</span>
            {[10, 25, 50, 100].map(v => (
              <button key={v} onClick={() => setBet(v)} className={`${styles.chipBtn} ${bet === v ? styles.chipActive : ''}`}>
                🪙 {v}
              </button>
            ))}
          </div>

          <div className={styles.autoRow}>
            <span className={styles.label}>Otomatik Cash Out (opsiyonel):</span>
            <input
              type="number"
              min="1.1"
              step="0.1"
              placeholder="2.00"
              value={autoCashOut}
              onChange={e => setAutoCashOut(e.target.value)}
              className={styles.autoInput}
            />
            <span className={styles.label}>x</span>
          </div>

          <button className={styles.startBtn} onClick={startGame} disabled={tokens < bet}>
            Bahis Oyna — ⬡{bet}
          </button>
        </div>
      )}

      {isRunning && (
        <button className={styles.cashOutBtn} onClick={handleCashOut}>
          CASH OUT — ⬡{Math.floor(bet * multiplier)}
        </button>
      )}

      {(isCrashed || isCashed) && (
        <button className={styles.startBtn} onClick={reset}>
          Yeniden Bahis Yap
        </button>
      )}

      {message && (
        <div className={`${styles.message} ${isCashed ? styles.win : isCrashed ? styles.lose : ''}`}>
          {message}
        </div>
      )}

      {/* History hints */}
      <p className={styles.hint}>
        Çarpan yükselirken zamanında Cash Out yap!
      </p>
    </div>
  );
}
