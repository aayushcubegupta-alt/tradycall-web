import { sendGAEvent } from "@next/third-parties/google";

/**
 * Persists the entry source of a Book Demo action to sessionStorage.
 */
export function setBookingSource(source: string): void {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem("tradycall_booking_source", source);
  } catch (e) {
    console.warn("[GA4 Analytics] Failed to set booking source in sessionStorage:", e);
  }
}

/**
 * Resolves the appropriate source parameter for Calendly events based on the action stage.
 * 
 * - For calendly_opened: allows "hero", "dashboard", "demo_page"
 * - For calendly_booking_completed / generate_lead: allows "dashboard", "demo_page"
 */
export function getBookingSource(stage: "opened" | "completed"): "hero" | "dashboard" | "demo_page" {
  if (typeof window === "undefined") return "demo_page";

  try {
    const storedSource = sessionStorage.getItem("tradycall_booking_source");
    
    if (stage === "opened") {
      if (storedSource === "dashboard") return "dashboard";
      if (storedSource === "hero") return "hero";
      return "demo_page";
    } else {
      // completed bookings
      if (storedSource === "dashboard") return "dashboard";
      return "demo_page";
    }
  } catch (e) {
    return "demo_page";
  }
}

/**
 * Dispatches a GA4 event with session-based and memory-based deduplication safeguards.
 * Prevents duplicates from React re-renders, route transitions, modal reopenings,
 * component remounts, and Calendly callback repetitions.
 */
export function sendUniqueGAEvent(
  eventName: string,
  params: Record<string, any> = {},
  dedupKey?: string
): void {
  if (typeof window === "undefined") return;

  // Create a unique key for deduplication
  const serializedParams = JSON.stringify(params);
  const key = dedupKey || `${eventName}_${serializedParams}`;
  const storageKey = `tradycall_ga_sent_${key}`;

  // 1. Session Storage Deduplication Lock
  try {
    if (sessionStorage.getItem(storageKey)) {
      console.log(`[GA4 Deduplicator] Event blocked (sessionStorage): ${eventName}`, params);
      return;
    }
  } catch (e) {
    // If cookies/sessionStorage are disabled, fallback gracefully to memory-only
  }

  // 2. Memory-based Deduplication Lock
  const win = window as any;
  if (!win._tradycallGAEvents) {
    win._tradycallGAEvents = new Set<string>();
  }
  if (win._tradycallGAEvents.has(key)) {
    console.log(`[GA4 Deduplicator] Event blocked (memory): ${eventName}`, params);
    return;
  }

  // Record event as dispatched
  try {
    sessionStorage.setItem(storageKey, "true");
  } catch (e) {
    // Graceful fallback
  }
  win._tradycallGAEvents.add(key);

  // Dispatch the event
  console.log(`[GA4 Analytics] Dispatching Event: ${eventName}`, params);
  sendGAEvent("event", eventName, params);
}

/**
 * Helper to track Book Demo CTA clicks and save the source for attribution.
 */
export function trackBookDemoClick(source: string): void {
  setBookingSource(source);
  sendUniqueGAEvent("book_demo_click", { source });
}
