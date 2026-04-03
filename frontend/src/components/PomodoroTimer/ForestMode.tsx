import React, { useState, useEffect, useCallback } from 'react';
import { getTodayTreeCount } from '../../lib/forestMetrics';

interface ForestModeProps {
  /** Call this to register a new completed session from outside */
  sessionCompletedSignal?: number;
}

const MAX_VISIBLE_TREES = 20;

export default function ForestMode({ sessionCompletedSignal = 0 }: ForestModeProps) {
  const [treeCount, setTreeCount] = useState<number>(() => getTodayTreeCount());

  // Refresh count whenever a session completes (signal increments)
  useEffect(() => {
    setTreeCount(getTodayTreeCount());
  }, [sessionCompletedSignal]);

  const visibleTrees = Math.min(treeCount, MAX_VISIBLE_TREES);
  const extraCount   = treeCount > MAX_VISIBLE_TREES ? treeCount - MAX_VISIBLE_TREES : 0;

  if (treeCount === 0) {
    return (
      <div className="flex flex-col items-center gap-2 py-3 px-5 rounded-2xl forest-mode-card">
        <p className="text-xs uppercase tracking-widest font-semibold forest-mode-label">
          Today's Forest
        </p>
        <p className="text-sm text-muted-foreground/60 italic">
          Complete a focus session to plant your first tree 🌱
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-3 py-4 px-6 rounded-2xl forest-mode-card">
      <p className="text-xs uppercase tracking-widest font-semibold forest-mode-label">
        Today's Forest
      </p>

      {/* Tree icons row */}
      <div className="flex flex-wrap justify-center gap-1 max-w-xs">
        {Array.from({ length: visibleTrees }).map((_, i) => (
          <span
            key={i}
            className="text-xl leading-none forest-tree-icon"
            style={{ animationDelay: `${i * 0.05}s` }}
            title={`Tree ${i + 1}`}
          >
            🌲
          </span>
        ))}
        {extraCount > 0 && (
          <span className="text-sm text-muted-foreground/70 self-center ml-1">
            +{extraCount}
          </span>
        )}
      </div>

      {/* Count label */}
      <p className="text-sm font-medium forest-mode-count">
        {treeCount} {treeCount === 1 ? 'tree' : 'trees'} grown today
      </p>
    </div>
  );
}
