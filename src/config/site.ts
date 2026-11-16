const GROOM_EN = 'Eslam';
const BRIDE_EN = 'Romisaa';
const VENUE_EN = 'Plaza';
const ADDRESS_EN =
  'Kornish Al Nil Street, Shubra al Khayma, Al Qalyubiya, Egypt';
const PLACE_LABEL_EN = 'Shubra al Khayma';

const mapsUrl =
  import.meta.env.VITE_MAPS_URL ?? 'https://maps.google.com/?q=30.111267,31.243286';

const mapsEmbedUrl =
  import.meta.env.VITE_MAPS_EMBED_URL ??
  'https://maps.google.com/maps?q=30.111267,31.243286&z=17&output=embed';

export const site = {
  groom: {
    ar: GROOM_EN,
    en: import.meta.env.VITE_GROOM_NAME_EN || GROOM_EN,
  },
  bride: {
    ar: BRIDE_EN,
    en: import.meta.env.VITE_BRIDE_NAME_EN || BRIDE_EN,
  },
  placeLabel: {
    ar: PLACE_LABEL_EN,
    en: import.meta.env.VITE_PLACE_LABEL_EN || PLACE_LABEL_EN,
  },
  weddingISO: import.meta.env.VITE_WEDDING_ISO ?? '2026-11-17T19:00:00',
  timezone: import.meta.env.VITE_TIMEZONE ?? 'Africa/Cairo',
  venue: {
    ar: VENUE_EN,
    en: import.meta.env.VITE_VENUE_NAME_EN || VENUE_EN,
  },
  address: {
    ar: ADDRESS_EN,
    en: import.meta.env.VITE_VENUE_ADDRESS_EN || ADDRESS_EN,
  },
  mapsUrl,
  mapsEmbedUrl,
} as const;
