// To satisfy TypeScript, declare gtag on the window object
declare global {
    interface Window {
        gtag?: (command: string, eventName: string, eventParams?: object) => void;
    }
}

export const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX'; // Placeholder

export const EventNames = {
    ANALYZE_START: 'analyze_design_system_start',
    ANALYZE_SUCCESS: 'analyze_design_system_success',
    ANALYZE_ERROR: 'analyze_design_system_error',
    COPY_MARKDOWN: 'copy_markdown',
    DOWNLOAD_ASSET: 'download_asset',
};

/**
 * Sends an event to Google Analytics.
 * @param eventName The name of the event to track.
 * @param params Optional parameters to send with the event.
 */
export const trackEvent = (eventName: string, params?: object) => {
    if (window.gtag) {
        window.gtag('event', eventName, params);
    } else {
        // Fallback for development or if gtag fails to load
        console.log(`GA Event (gtag not found): ${eventName}`, params);
    }
};
