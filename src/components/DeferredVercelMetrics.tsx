import { useEffect, useState } from 'react';
import type { ComponentType } from 'react';
import { scheduleIdleTask } from '../utils/idle';

type MetricsComponents = {
  Analytics: ComponentType;
  SpeedInsights: ComponentType;
};

export function DeferredVercelMetrics() {
  const [metrics, setMetrics] = useState<MetricsComponents | null>(null);

  useEffect(() => {
    let cancelled = false;

    const cancelIdleTask = scheduleIdleTask(() => {
      Promise.all([
        import('@vercel/analytics/react'),
        import('@vercel/speed-insights/react'),
      ]).then(([analytics, speedInsights]) => {
        if (!cancelled) {
          setMetrics({
            Analytics: analytics.Analytics,
            SpeedInsights: speedInsights.SpeedInsights,
          });
        }
      });
    }, 1600);

    return () => {
      cancelled = true;
      cancelIdleTask();
    };
  }, []);

  if (!metrics) return null;

  const { Analytics, SpeedInsights } = metrics;

  return (
    <>
      <Analytics />
      <SpeedInsights />
    </>
  );
}
