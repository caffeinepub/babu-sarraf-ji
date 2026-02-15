import { useEffect, useState } from 'react';
import { getMetrics } from '../../lib/studyMetrics';
import { Target, Flame } from 'lucide-react';

export default function MetricsPanel() {
  const [metrics, setMetrics] = useState({ dailySessions: 0, streak: 0 });

  useEffect(() => {
    const updateMetrics = () => {
      setMetrics(getMetrics());
    };

    updateMetrics();
    const interval = setInterval(updateMetrics, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-card border border-border rounded-lg p-4 space-y-4">
      <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
        Study Metrics
      </h3>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Target className="w-4 h-4" />
            <span className="text-xs font-medium">Today</span>
          </div>
          <div className="text-2xl font-bold">{metrics.dailySessions}</div>
          <div className="text-xs text-muted-foreground">sessions</div>
        </div>

        <div className="space-y-1">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Flame className="w-4 h-4" />
            <span className="text-xs font-medium">Streak</span>
          </div>
          <div className="text-2xl font-bold">{metrics.streak}</div>
          <div className="text-xs text-muted-foreground">days</div>
        </div>
      </div>
    </div>
  );
}
