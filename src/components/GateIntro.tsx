import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { site } from '../config/site';
import { RosePatternLayer, RoseSvg } from './RosePattern';
import './GateIntro.css';

type Phase = 'idle' | 'parting' | 'exit';

interface Props {
  onOpen: () => void;
}

export function GateIntro({ onOpen }: Props) {
  const { i18n } = useTranslation();
  const lang = i18n.language as 'ar' | 'en';
  const shouldReduce = useReducedMotion();
  const [phase, setPhase] = useState<Phase>('idle');

  const handleTap = () => {
    if (phase !== 'idle') return;
    if (shouldReduce) {
      onOpen();
      return;
    }
    setPhase('parting');
    setTimeout(() => setPhase('exit'), 1100);
    setTimeout(() => onOpen(), 1650);
  };

  const open = phase !== 'idle';

  return (
    <AnimatePresence>
      {phase !== 'exit' ? (
        <motion.div
          className="gate-screen"
          key="gate-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5, ease: 'easeIn' } }}
        >
          <div className="gate-sky" aria-hidden="true" />
          <RosePatternLayer opacity={0.08} />
          <div className="gate-fireflies" aria-hidden="true">
            <span /><span /><span /><span /><span />
          </div>

          <motion.div
            className="gate-stage"
            initial={shouldReduce ? {} : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          >
            <div className="gate-roses" aria-hidden="true">
              <RoseSvg size={42} color="#C4956A" opacity={0.85} />
              <RoseSvg size={72} color="#8B1A3A" opacity={0.95} />
              <RoseSvg size={42} color="#C4956A" opacity={0.85} />
            </div>

            <button
              type="button"
              className="gate"
              onClick={handleTap}
              aria-label={lang === 'ar' ? 'ادخل الحديقة' : 'Enter the garden'}
              disabled={phase !== 'idle'}
            >
              <div className="gate-peek">
                <p className="gate-peek-kicker">{lang === 'ar' ? 'الجمعة · ٧ م' : 'Friday · 7 PM'}</p>
                <p className="gate-peek-name">{site.groom[lang]}</p>
                <p className="gate-peek-and">{lang === 'ar' ? 'و' : '&'}</p>
                <p className="gate-peek-name">{site.bride[lang]}</p>
              </div>

              <motion.div
                className="gate-door gate-door--left"
                aria-hidden="true"
                animate={{ x: open ? '-108%' : 0 }}
                transition={{ duration: 1.05, ease: [0.76, 0, 0.24, 1] }}
              />
              <motion.div
                className="gate-door gate-door--right"
                aria-hidden="true"
                animate={{ x: open ? '108%' : 0 }}
                transition={{ duration: 1.05, ease: [0.76, 0, 0.24, 1] }}
              />
            </button>

            <AnimatePresence>
              {phase === 'idle' && (
                <motion.p
                  key="hint"
                  className="gate-hint"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: 0.9, duration: 0.45 }}
                >
                  {lang === 'ar' ? 'ادخلوا الحديقة' : 'Enter the garden'}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
