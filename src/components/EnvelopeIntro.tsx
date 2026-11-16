import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { site } from '../config/site';
import { RosePatternLayer, RoseDivider, RoseBorderFrame } from './RosePattern';
import './EnvelopeIntro.css';

type Phase = 'idle' | 'flapOpen' | 'cardRise' | 'exit';

interface Props {
  onOpen: () => void;
}

export function EnvelopeIntro({ onOpen }: Props) {
  const { t, i18n } = useTranslation();
  const lang         = i18n.language as 'ar' | 'en';
  const shouldReduce = useReducedMotion();
  const [phase, setPhase]   = useState<Phase>('idle');

  const groomName = site.groom[lang];
  const brideName = site.bride[lang];

  const handleTap = () => {
    if (phase !== 'idle') return;

    if (shouldReduce) {
      // Respect user preference: skip straight to invitation
      onOpen();
      return;
    }

    setPhase('flapOpen');
    setTimeout(() => setPhase('cardRise'),  700);
    setTimeout(() => setPhase('exit'),     1500);
    setTimeout(() => onOpen(),             2100);
  };

  // Card animation state
  const cardY       = phase === 'cardRise' || phase === 'exit' ? '-62%' : '4%';
  const cardOpacity = 1;
  const cardScale   = phase === 'cardRise' || phase === 'exit' ? 1 : 0.94;

  // Flap angle
  const flapRotateX = phase !== 'idle' ? -185 : 0;

  return (
    <AnimatePresence>
      {phase !== 'exit' ? (
        <motion.div
          className="env-screen"
          key="envelope-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.06, transition: { duration: 0.55, ease: 'easeIn' } }}
        >
          {/* Background */}
          <div className="env-bg-gradient" aria-hidden="true" />
          <RosePatternLayer opacity={0.06} />
          <div className="env-bg-scrim" aria-hidden="true" />

          {/* Stage */}
          <motion.div
            className="env-stage"
            initial={shouldReduce ? {} : { opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
          >

            {/* ── Envelope ─────────────────────────── */}
            <motion.div
              className="envelope"
              onClick={handleTap}
              role="button"
              aria-label={lang === 'ar' ? 'اضغط لفتح الدعوة' : 'Tap to open invitation'}
              tabIndex={0}
              onKeyDown={e => e.key === 'Enter' && handleTap()}
              whileHover={phase === 'idle' ? { scale: 1.04, y: -6 } : {}}
              whileTap={phase  === 'idle' ? { scale: 0.97 }       : {}}
              style={{ cursor: phase === 'idle' ? 'pointer' : 'default' }}
            >
              {/* ── Envelope body (folds) ─────────── */}
              <div className="env-body" aria-hidden="true">
                <div className="env-fold env-fold--left"   />
                <div className="env-fold env-fold--right"  />
                <div className="env-fold env-fold--bottom" />
                <div className="env-fold env-fold--center" />
              </div>

              {/* ── Inner invitation card ────────────
                   Sits inside the envelope and rises on click */}
              <motion.div
                className="env-inner-card"
                animate={{ y: cardY, opacity: cardOpacity, scale: cardScale }}
                transition={{ duration: 0.72, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Mini rose frame inside the card */}
                <RoseBorderFrame
                  color="#8B1A3A"
                  roseSize={22}
                  roseOpacity={0.55}
                  lineOpacity={0.18}
                  margin={5}
                  position="absolute"
                />
                <div className="env-card-content">
                  <img
                    className="env-card-photo"
                    src="/couple-card.jpg"
                    alt={`${groomName} & ${brideName}`}
                    width={108}
                    height={108}
                  />
                  <p className="env-card-invite">
                    {lang === 'ar' ? 'دعوة زفاف' : 'Wedding Invitation'}
                  </p>
                  <div style={{ width: '80%', margin: '0.1rem 0' }}>
                    <RoseDivider />
                  </div>
                  <p className="env-card-groom">{groomName}</p>
                  <p className="env-card-and">{t('and')}</p>
                  <p className="env-card-bride">{brideName}</p>
                </div>
              </motion.div>

              {/* ── Envelope flap (opens on click) ── */}
              <div className="env-flap-wrapper" aria-hidden="true">
                <motion.div
                  className="env-flap"
                  animate={{ rotateX: flapRotateX }}
                  transition={{ duration: 0.65, ease: [0.4, 0, 0.2, 1] }}
                  style={{ transformOrigin: 'top center', transformStyle: 'preserve-3d' }}
                >
                  {/* Wax seal visible only when flap is closed */}
                  <div className="env-seal">
                    <svg width="38" height="38" viewBox="0 0 60 60" aria-hidden="true">
                      {/* Outer ring */}
                      <circle cx="30" cy="30" r="28" fill="#6B1230" opacity="0.6" />
                      <circle cx="30" cy="30" r="24" fill="#8B1A3A" />
                      {/* Rose petals (outer) */}
                      <g transform="translate(30,30)" fill="white" opacity="0.92">
                        <ellipse cx="0" cy="-10" rx="3.5" ry="7" transform="rotate(0)"   />
                        <ellipse cx="0" cy="-10" rx="3.5" ry="7" transform="rotate(45)"  />
                        <ellipse cx="0" cy="-10" rx="3.5" ry="7" transform="rotate(90)"  />
                        <ellipse cx="0" cy="-10" rx="3.5" ry="7" transform="rotate(135)" />
                        <ellipse cx="0" cy="-10" rx="3.5" ry="7" transform="rotate(180)" />
                        <ellipse cx="0" cy="-10" rx="3.5" ry="7" transform="rotate(225)" />
                        <ellipse cx="0" cy="-10" rx="3.5" ry="7" transform="rotate(270)" />
                        <ellipse cx="0" cy="-10" rx="3.5" ry="7" transform="rotate(315)" />
                      </g>
                      {/* Rose inner */}
                      <g transform="translate(30,30)" fill="white" opacity="0.65">
                        <ellipse cx="0" cy="-6.5" rx="2.5" ry="5" transform="rotate(22.5)"  />
                        <ellipse cx="0" cy="-6.5" rx="2.5" ry="5" transform="rotate(67.5)"  />
                        <ellipse cx="0" cy="-6.5" rx="2.5" ry="5" transform="rotate(112.5)" />
                        <ellipse cx="0" cy="-6.5" rx="2.5" ry="5" transform="rotate(157.5)" />
                        <ellipse cx="0" cy="-6.5" rx="2.5" ry="5" transform="rotate(202.5)" />
                        <ellipse cx="0" cy="-6.5" rx="2.5" ry="5" transform="rotate(247.5)" />
                        <ellipse cx="0" cy="-6.5" rx="2.5" ry="5" transform="rotate(292.5)" />
                        <ellipse cx="0" cy="-6.5" rx="2.5" ry="5" transform="rotate(337.5)" />
                      </g>
                      <circle cx="30" cy="30" r="4" fill="white" opacity="0.55" />
                      {/* Thin outer decorative ring */}
                      <circle cx="30" cy="30" r="27" fill="none" stroke="white" strokeWidth="0.6" opacity="0.35" />
                    </svg>
                  </div>
                </motion.div>
              </div>

              {/* "Welcome" text after card rises */}
              <AnimatePresence>
                {(phase === 'cardRise') && (
                  <motion.p
                    key="welcome"
                    className="env-welcome"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: 0.3, duration: 0.4 }}
                  >
                    {lang === 'ar' ? 'تفضّلوا...' : 'Welcome…'}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>

            {/* ── Hint text below envelope ─────────── */}
            <AnimatePresence>
              {phase === 'idle' && (
                <motion.p
                  key="hint"
                  className="env-hint env-hint--pulse"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4, transition: { duration: 0.2 } }}
                  transition={{ delay: 1.1, duration: 0.5 }}
                >
                  {lang === 'ar' ? '✦  اضغط لفتح الدعوة  ✦' : '✦  Tap to open your invitation  ✦'}
                </motion.p>
              )}
            </AnimatePresence>

          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
