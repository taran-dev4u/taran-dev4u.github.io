type AnalyticsEvent = {
  action: string;
  category?: string;
  label?: string;
  value?: number;
  onComplete?: () => void;
};

export type ResumeAction = 'resume_view' | 'resume_download';

type ResumeAnalyticsEvent = {
  id: string;
  action: ResumeAction;
  source: string;
  path: string;
  referrer: string;
  occurredAt: string;
};

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    umami?: {
      track?: (eventName: string, eventData?: Record<string, unknown>) => void;
    };
    clarity?: (...args: unknown[]) => void;
  }
}

const gaMeasurementId = (import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined) || 'G-RSV4E83S9P';
const umamiWebsiteId = import.meta.env.VITE_UMAMI_WEBSITE_ID as string | undefined;
const umamiScriptUrl = import.meta.env.VITE_UMAMI_SCRIPT_URL as string | undefined;
const clarityProjectId = import.meta.env.VITE_CLARITY_PROJECT_ID as string | undefined;
const resumeTrackingEndpoint = import.meta.env.VITE_RESUME_TRACKING_ENDPOINT as string | undefined;

const resumeQueueKey = 'portfolio-resume-event-queue';

let initialized = false;

const appendScript = (src: string, attributes: Record<string, string> = {}) => {
  if (document.querySelector(`script[src="${src}"]`)) return;

  const script = document.createElement('script');
  script.async = true;
  script.src = src;

  Object.entries(attributes).forEach(([key, value]) => {
    script.setAttribute(key, value);
  });

  document.head.appendChild(script);
};

export const initAnalytics = () => {
  if (initialized || typeof window === 'undefined') return;
  initialized = true;

  if (gaMeasurementId) {
    appendScript(`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () {
      window.dataLayer?.push(arguments);
    };
    window.gtag('js', new Date());
    window.gtag('config', gaMeasurementId, {
      page_path: window.location.pathname,
      send_page_view: false,
      anonymize_ip: true,
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
    });
  }

  if (umamiWebsiteId && umamiScriptUrl) {
    appendScript(umamiScriptUrl, {
      'data-website-id': umamiWebsiteId,
      'data-do-not-track': 'true',
    });
  }

  if (clarityProjectId) {
    appendScript(`https://www.clarity.ms/tag/${clarityProjectId}`);
  }
};

export const trackEvent = ({ action, category = 'portfolio', label, value, onComplete }: AnalyticsEvent) => {
  if (typeof window === 'undefined') return;

  if (window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value,
      send_to: gaMeasurementId,
      transport_type: 'beacon',
      ...(onComplete ? { event_callback: onComplete, event_timeout: 1000 } : {}),
    });
  }

  window.umami?.track?.(action, {
    category,
    label,
    value,
  });

  window.clarity?.('event', action);

  if (!window.gtag) onComplete?.();
};

const readResumeQueue = (): ResumeAnalyticsEvent[] => {
  try {
    const value = window.localStorage.getItem(resumeQueueKey);
    return value ? JSON.parse(value) as ResumeAnalyticsEvent[] : [];
  } catch {
    return [];
  }
};

const writeResumeQueue = (events: ResumeAnalyticsEvent[]) => {
  try {
    if (events.length === 0) {
      window.localStorage.removeItem(resumeQueueKey);
      return;
    }

    window.localStorage.setItem(resumeQueueKey, JSON.stringify(events.slice(-50)));
  } catch {
    // Analytics must never block a resume action when storage is unavailable.
  }
};

let resumeQueueFlush: Promise<void> | null = null;

export const flushResumeAnalytics = async () => {
  if (typeof window === 'undefined' || !resumeTrackingEndpoint || resumeQueueFlush) return resumeQueueFlush;

  const queuedEvents = readResumeQueue();
  if (queuedEvents.length === 0) return;

  resumeQueueFlush = (async () => {
    const delivered = new Set<string>();

    for (const event of queuedEvents) {
      try {
        const response = await fetch(resumeTrackingEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'text/plain;charset=UTF-8' },
          body: JSON.stringify(event),
          keepalive: true,
          mode: 'cors',
        });

        if (response.ok) delivered.add(event.id);
      } catch {
        break;
      }
    }

    if (delivered.size > 0) {
      writeResumeQueue(readResumeQueue().filter((event) => !delivered.has(event.id)));
    }
  })().finally(() => {
    resumeQueueFlush = null;
  });

  return resumeQueueFlush;
};

export const trackResumeAction = (action: ResumeAction, source: string, onComplete?: () => void) => {
  if (typeof window === 'undefined') return;

  trackEvent({ action, category: 'resume', label: source, onComplete });

  if (!resumeTrackingEndpoint) return;

  const event: ResumeAnalyticsEvent = {
    id: window.crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    action,
    source,
    path: window.location.pathname,
    referrer: document.referrer ? new URL(document.referrer).hostname : 'direct',
    occurredAt: new Date().toISOString(),
  };

  writeResumeQueue([...readResumeQueue(), event]);
  void flushResumeAnalytics();
};
