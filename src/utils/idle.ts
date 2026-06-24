type IdleScheduler = Window & {
  requestIdleCallback?: (callback: () => void, options?: { timeout: number }) => number;
  cancelIdleCallback?: (id: number) => void;
};

export function scheduleIdleTask(callback: () => void, timeout = 1200) {
  const idleWindow = window as IdleScheduler;

  if (idleWindow.requestIdleCallback && idleWindow.cancelIdleCallback) {
    const id = idleWindow.requestIdleCallback(callback, { timeout });
    return () => idleWindow.cancelIdleCallback?.(id);
  }

  const id = window.setTimeout(callback, 1);
  return () => window.clearTimeout(id);
}
