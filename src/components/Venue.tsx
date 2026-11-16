import { useTranslation } from 'react-i18next';
import { site } from '../config/site';

export function Venue() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language as 'ar' | 'en';
  const venueName = site.venue[lang];
  const venueAddress = site.address[lang];

  return (
    <section className="venue-section">
      <h2 className="section-title">{t('venue.title')}</h2>

      <div className="venue-name">{venueName}</div>
      <p className="venue-address">{venueAddress}</p>

      <div className="venue-map-embed" aria-label={t('venue.mapLabel')}>
        <iframe
          title={t('venue.mapLabel')}
          src={site.mapsEmbedUrl}
          width="100%"
          height="360"
          style={{ border: 0, borderRadius: 'var(--r-md)' }}
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>

      <a
        href={site.mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-primary venue-btn"
      >
        <span className="btn-icon">📍</span>
        {t('venue.openMaps')}
      </a>
    </section>
  );
}
