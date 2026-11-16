import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toZonedTime } from 'date-fns-tz';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { site } from '../config/site';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  done: boolean;
  past: boolean;
}

function computeTimeLeft(): TimeLeft {
  const now    = Date.now();
  const target = new Date(site.weddingISO);
  // Treat the ISO string as local time in the configured timezone
  const zoned  = toZonedTime(target, site.timezone);
  const diff   = zoned.getTime() - now;

  if (diff <= 0 && diff > -4 * 60 * 60 * 1000) return { days: 0, hours: 0, minutes: 0, seconds: 0, done: true, past: false };
  if (diff <= -4 * 60 * 60 * 1000) return { days: 0, hours: 0, minutes: 0, seconds: 0, done: false, past: true };

  const totalSec = Math.floor(diff / 1000);
  return {
    days:    Math.floor(totalSec / 86400),
    hours:   Math.floor((totalSec % 86400) / 3600),
    minutes: Math.floor((totalSec % 3600) / 60),
    seconds: totalSec % 60,
    done:  false,
    past:  false,
  };
}

function pad(n: number): string {
  return String(n).padStart(2, '0');
}

/** Animated digit: flips when value changes */
function Digit({ value, changed }: { value: string; changed: boolean }) {
  const shouldReduce = useReducedMotion();
  return (
    <AnimatePresence mode="popLayout" initial={false}>
      <motion.span
        key={value}
        initial={shouldReduce ? {} : { y: -18, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={shouldReduce ? {} : { y: 18, opacity: 0 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        style={{ display: 'inline-block' }}
        className={changed ? 'digit-changed' : ''}
      >
        {value}
      </motion.span>
    </AnimatePresence>
  );
}

interface UnitProps {
  value: number;
  labelPlural: string;
}

function CountUnit({ value, labelPlural }: UnitProps) {
  const prevRef   = useRef(value);
  const changed   = value !== prevRef.current;
  useEffect(() => { prevRef.current = value; }, [value]);

  const formatted = pad(value);

  return (
    <div className="count-unit">
      <div className="count-number">
        <Digit value={formatted[0]} changed={changed} />
        <Digit value={formatted[1]} changed={changed} />
      </div>
      <span className="count-label">{labelPlural}</span>
    </div>
  );
}

export function Countdown() {
  const { t } = useTranslation();
  const [time, setTime] = useState<TimeLeft>(computeTimeLeft);

  useEffect(() => {
    const id = setInterval(() => setTime(computeTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  if (time.done) {
    return (
      <div className="countdown-done">
        {t('countdown.happeningNow')}
      </div>
    );
  }

  if (time.past) {
    return (
      <div className="countdown-done">
        {t('countdown.eventPassed')}
      </div>
    );
  }

  return (
    <div className="countdown-grid">
      <CountUnit value={time.days}    labelPlural={t('countdown.days')}    />
      <CountUnit value={time.hours}   labelPlural={t('countdown.hours')}   />
      <CountUnit value={time.minutes} labelPlural={t('countdown.minutes')} />
      <CountUnit value={time.seconds} labelPlural={t('countdown.seconds')} />
    </div>
  );
}
