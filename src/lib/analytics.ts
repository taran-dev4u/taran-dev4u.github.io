type AnalyticsEvent = {
  action: string;
  category?: string;
  label?: string;
  value?: number;
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

const gaMeasurementId = import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined;
const umamiWebsiteId = import.meta.env.VITE_UMAMI_WEBSITE_ID as string | undefined;
const umamiScriptUrl = import.meta.env.VITE_UMAMI_SCRIPT_URL as string | undefined;
const clarityProjectId = import.meta.env.VITE_CLARITY_PROJECT_ID as string | undefined;

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
    window.gtag = (...args: unknown[]) => {
      window.dataLayer?.push(args);
    };
    window.gtag('js', new Date());
    window.gtag('config', gaMeasurementId, {
      page_path: window.location.pathname,
      anonymize_ip: true,
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

export const trackEvent = ({ action, category = 'portfolio', label, value }: AnalyticsEvent) => {
  if (typeof window === 'undefined') return;

  if (window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value,
    });
  }

  window.umami?.track?.(action, {
    category,
    label,
    value,
  });

  window.clarity?.('event', action);
};

export const trackAnonymousVisitorContext = () => {
  if (typeof window === 'undefined') return;

  const referrerHost = document.referrer ? new URL(document.referrer).hostname : 'direct';
  const context = {
    referrer: referrerHost,
    language: navigator.language,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    screen: `${window.screen.width}x${window.screen.height}`,
    viewport: `${window.innerWidth}x${window.innerHeight}`,
    device:
      window.innerWidth < 640 ? 'mobile'
        : window.innerWidth < 1024 ? 'tablet'
          : 'desktop',
  };

  if (window.gtag) {
    window.gtag('event', 'visitor_context', {
      event_category: 'analytics',
      event_label: context.device,
      referrer: context.referrer,
      language: context.language,
      timezone: context.timezone,
      screen_size: context.screen,
      viewport_size: context.viewport,
    });
  }

  window.umami?.track?.('visitor_context', context);
  window.clarity?.('set', 'device', context.device);
};
