import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { format } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';
import { enUS } from 'date-fns/locale';

import { site } from './config/site';
import { EnvelopeIntro } from './components/EnvelopeIntro';
import { RoseBorderFrame, RosePatternLayer, RoseDivider, RoseSvg } from './components/RosePattern';
import { Countdown } from './components/Countdown';
import { CalendarActions } from './components/CalendarActions';
import { Venue } from './components/Venue';
import { ShareLink } from './components/ShareLink';
import { MusicPlayer } from './components/MusicPlayer';
import { OrderInviteCta } from './components/OrderInviteCta';
import './App.css';

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

const itemVariants = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
};

const noMotion      = { hidden: {}, visible: {} };
const noMotionItem  = { hidden: {}, visible: {} };

export default function App() {
  const { t } = useTranslation();
  const lang = 'en' as const;
  const shouldReduce = useReducedMotion();
  const [inviteVisible, setInviteVisible] = useState(false);

  useEffect(() => {
    document.documentElement.lang = 'en';
    document.documentElement.dir = 'ltr';
    document.title = `${site.groom.en} & ${site.bride.en} — Wedding Invitation`;
    localStorage.setItem('lang', 'en');
  }, []);

  const weddingDate = toZonedTime(new Date(site.weddingISO), site.timezone);
  const dateFormatted = format(weddingDate, 'MMMM d, yyyy', { locale: enUS });
  const weekdayFormatted = format(weddingDate, 'EEEE', { locale: enUS });
  const timeFormatted = format(weddingDate, 'h:mm a', { locale: enUS });

  const cv = shouldReduce ? noMotion : containerVariants;
  const iv = shouldReduce ? noMotionItem : itemVariants;

  return (
    <>
      <RoseBorderFrame />
      <MusicPlayer />

      <AnimatePresence>
        {!inviteVisible && (
          <EnvelopeIntro onOpen={() => setInviteVisible(true)} />
        )}
      </AnimatePresence>

      <motion.div
        className="page"
        initial={{ opacity: 0 }}
        animate={{ opacity: inviteVisible ? 1 : 0 }}
        transition={{ duration: 0.65, ease: 'easeOut' }}
        aria-hidden={!inviteVisible}
      >
        <header className="hero">
          <div className="hero-gradient" aria-hidden="true" />
          <RosePatternLayer opacity={0.1} />
          <div className="hero-scrim" aria-hidden="true" />
          <div className="hero-rose" aria-hidden="true">
            <RoseSvg size={88} color="var(--clr-accent)" opacity={0.85} />
          </div>

          <motion.div
            className="hero-content container"
            variants={cv}
            initial="hidden"
            animate={inviteVisible ? 'visible' : 'hidden'}
          >
            <motion.p variants={iv} className="invite-label">
              {site.placeLabel.en}
            </motion.p>

            <motion.h1 variants={iv} className="couple-names">
              <span className="groom-name">{site.groom[lang]}</span>
              <span className="names-and">{t('and')}</span>
              <span className="bride-name">{site.bride[lang]}</span>
            </motion.h1>

            <motion.div variants={iv} className="hero-ornament">
              <RoseDivider />
            </motion.div>

            <motion.div variants={iv} className="couple-photo">
              <img
                src="/couple-card.jpg"
                alt={`${site.groom.en} & ${site.bride.en}`}
                width={640}
                height={640}
              />
            </motion.div>

            <motion.div variants={iv} className="wedding-date-block">
              <p className="date-label">{t('weddingDate')}</p>
              <p className="date-mark">{weekdayFormatted}</p>
              <p className="date-value">{dateFormatted}</p>
              <p className="time-value">{timeFormatted}</p>
            </motion.div>

            <motion.div variants={iv} className="quran-verse-block">
              <p className="quran-verse-text">{t('quranVerse')}</p>
              <p className="quran-verse-translation">{t('quranVerseTranslation')}</p>
              <p className="quran-verse-ref">{t('quranRef')}</p>
            </motion.div>
          </motion.div>
        </header>

        <main className="main-content">
          <div className="container">
            <motion.section
              className="blessing-section"
              variants={iv}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
            >
              <div className="blessing-card">
                <div className="blessing-top-ornament" aria-hidden="true">✦</div>
                <p className="blessing-dua">{t('blessing')}</p>
                <p className="blessing-source">{t('blessingSource')}</p>
                <p className="blessing-translation">{t('blessingTranslation')}</p>
                <div className="blessing-divider" aria-hidden="true" />
                <p className="blessing-note">{t('blessingNote')}</p>
              </div>
            </motion.section>

            <RoseDivider />

            <motion.section
              className="section"
              variants={iv}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
            >
              <Countdown />
            </motion.section>

            <RoseDivider />

            <motion.div
              variants={iv}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
            >
              <Venue />
            </motion.div>

            <RoseDivider />

            <motion.div
              variants={iv}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
            >
              <CalendarActions />
            </motion.div>

            <RoseDivider />

            <motion.div
              variants={iv}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
            >
              <ShareLink />
            </motion.div>
          </div>
        </main>

        <footer className="footer">
          <div className="container">
            <RoseDivider />
            <p className="footer-text">
              {`${site.groom.en} & ${site.bride.en}`}
            </p>
            <OrderInviteCta />
          </div>
        </footer>
      </motion.div>
    </>
  );
}
