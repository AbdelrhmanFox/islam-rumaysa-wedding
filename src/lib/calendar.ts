import { toZonedTime, format as tzFormat } from 'date-fns-tz';

/** Format a Date to "YYYYMMDDTHHmmss" in the given IANA zone (for iCal/Google). */
function toICalDateString(date: Date, timeZone: string): string {
  const zoned = toZonedTime(date, timeZone);
  return tzFormat(zoned, "yyyyMMdd'T'HHmmss", { timeZone });
}

export interface CalendarEvent {
  title: string;
  description: string;
  location: string;
  startISO: string;   // "2026-08-15T19:00:00" local time
  timezone: string;   // IANA zone "Africa/Cairo"
  durationHours?: number;
}

/** Build and download a standard .ics file. */
export function downloadIcs(event: CalendarEvent): void {
  const start = new Date(event.startISO);
  const end = new Date(start.getTime() + (event.durationHours ?? 4) * 60 * 60 * 1000);

  const dtStart = toICalDateString(start, event.timezone);
  const dtEnd   = toICalDateString(end,   event.timezone);
  const uid     = `wedding-${dtStart}@invite`;
  const stamp   = toICalDateString(new Date(), event.timezone);

  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Wedding Invite//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${stamp}`,
    `DTSTART;TZID=${event.timezone}:${dtStart}`,
    `DTEND;TZID=${event.timezone}:${dtEnd}`,
    `SUMMARY:${event.title}`,
    `DESCRIPTION:${event.description.replace(/\n/g, '\\n')}`,
    `LOCATION:${event.location}`,
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR',
  ];

  const blob = new Blob([lines.join('\r\n')], { type: 'text/calendar;charset=utf-8' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href = url;
  a.download = 'wedding-invite.ics';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/** Build an "Add to Google Calendar" URL. */
export function googleCalendarUrl(event: CalendarEvent): string {
  const start = new Date(event.startISO);
  const end   = new Date(start.getTime() + (event.durationHours ?? 4) * 60 * 60 * 1000);

  const fmt = (d: Date) =>
    d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');

  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: event.title,
    dates: `${fmt(start)}/${fmt(end)}`,
    details: event.description,
    location: event.location,
    ctz: event.timezone,
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}
