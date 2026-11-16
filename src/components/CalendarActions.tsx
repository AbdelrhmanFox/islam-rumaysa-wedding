import { useTranslation } from 'react-i18next';
import { site } from '../config/site';
import { googleCalendarUrl } from '../lib/calendar';

export function CalendarActions() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language as 'ar' | 'en';

  const eventPayload = {
    title:        `${site.groom[lang]} & ${site.bride[lang]}`,
    description:  `${t('invitation')} — ${site.venue[lang]}\n${site.address[lang]}`,
    location:     `${site.venue[lang]}, ${site.address[lang]}`,
    startISO:     site.weddingISO,
    timezone:     site.timezone,
    durationHours: 4,
  };

  return (
    <section className="calendar-section">
      <h2 className="section-title">{t('calendar.title')}</h2>

      <div className="calendar-row">
        <a
          href={googleCalendarUrl(eventPayload)}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-outline"
        >
          <span className="btn-icon">🗓️</span>
          {t('calendar.google')}
        </a>
      </div>
    </section>
  );
}
