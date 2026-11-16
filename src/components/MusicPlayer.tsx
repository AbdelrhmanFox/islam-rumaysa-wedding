import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import './MusicPlayer.css';

export function MusicPlayer() {
  const [playing, setPlaying]   = useState(false);
  const [loaded,  setLoaded]    = useState(false);
  const [available, setAvailable] = useState(false);
  const audioRef                = useRef<HTMLAudioElement | null>(null);
  const prefersReduced          = useReducedMotion();

  useEffect(() => {
    let cancelled = false;
    const audio = new Audio('/nasheed-ir.mp3');
    audio.loop   = true;
    audio.volume = 0.35;
    audioRef.current = audio;

    const onReady = () => {
      if (cancelled) return;
      setAvailable(true);
      setLoaded(true);
    };
    const onError = () => {
      if (cancelled) return;
      setAvailable(false);
    };

    audio.addEventListener('canplaythrough', onReady);
    audio.addEventListener('error', onError);
    audio.load();

    const tryPlay = () => {
      audio.play().then(() => setPlaying(true)).catch(() => {});
      window.removeEventListener('pointerdown', tryPlay);
      window.removeEventListener('keydown', tryPlay);
    };

    audio.play().then(() => {
      setAvailable(true);
      setPlaying(true);
    }).catch(() => {
      window.addEventListener('pointerdown', tryPlay, { once: true });
      window.addEventListener('keydown',     tryPlay, { once: true });
    });

    return () => {
      cancelled = true;
      audio.pause();
      audio.src = '';
      audio.removeEventListener('canplaythrough', onReady);
      audio.removeEventListener('error', onError);
      window.removeEventListener('pointerdown', tryPlay);
      window.removeEventListener('keydown',     tryPlay);
    };
  }, []);

  if (!available && !loaded) return null;

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play().then(() => setPlaying(true)).catch(() => {});
    }
  };

  return (
    <button
      className={`music-btn ${playing ? 'music-btn--playing' : ''} ${!loaded ? 'music-btn--loading' : ''}`}
      onClick={toggle}
      aria-label={playing ? 'إيقاف الموسيقى' : 'تشغيل الموسيقى'}
      title={playing ? 'إيقاف الموسيقى' : 'تشغيل الموسيقى'}
      type="button"
    >
      {!prefersReduced && playing && (
        <>
          <span className="music-ring music-ring--1" aria-hidden="true" />
          <span className="music-ring music-ring--2" aria-hidden="true" />
        </>
      )}

      <span className="music-icon" aria-hidden="true">
        {playing ? (
          <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
            <rect x="6" y="4" width="4" height="16" rx="1"/>
            <rect x="14" y="4" width="4" height="16" rx="1"/>
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
            <path d="M9 3v10.55A4 4 0 1 0 11 17V7h4V3H9z"/>
          </svg>
        )}
      </span>
    </button>
  );
}
