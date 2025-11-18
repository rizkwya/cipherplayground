// src/utils/showError.js
export function showError(msg) {
  // Emit a global event that the app can listen to and convert into a toast
  try {
    const ev = new CustomEvent('app-toast', { detail: { message: String(msg || ''), color: 'red' } });
    window.dispatchEvent(ev);
  } catch (e) {
    // Fallback to alert if CustomEvent or window isn't available
    try { alert(msg); } catch { /* ignore */ }
  }
}
