import { Minus, Plus } from 'lucide-react';

interface DurationControlsProps {
  focusDuration: number;
  breakDuration: number;
  onFocusDurationChange: (value: number) => void;
  onBreakDurationChange: (value: number) => void;
}

export default function DurationControls({
  focusDuration,
  breakDuration,
  onFocusDurationChange,
  onBreakDurationChange,
}: DurationControlsProps) {
  const adjustDuration = (current: number, delta: number, setter: (value: number) => void) => {
    const newValue = Math.max(1, Math.min(120, current + delta));
    setter(newValue);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 space-y-4">
      <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
        Duration Settings
      </h3>
      
      {/* Focus Duration */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Focus Time (minutes)</label>
        <div className="flex items-center gap-2">
          <button
            onClick={() => adjustDuration(focusDuration, -5, onFocusDurationChange)}
            className="p-2 rounded-md bg-secondary hover:bg-secondary/80 transition-colors"
          >
            <Minus className="w-4 h-4" />
          </button>
          <input
            type="number"
            value={focusDuration}
            onChange={(e) => {
              const value = parseInt(e.target.value);
              if (!isNaN(value) && value > 0 && value <= 120) {
                onFocusDurationChange(value);
              }
            }}
            className="flex-1 px-3 py-2 bg-background border border-input rounded-md text-center font-medium"
            min="1"
            max="120"
          />
          <button
            onClick={() => adjustDuration(focusDuration, 5, onFocusDurationChange)}
            className="p-2 rounded-md bg-secondary hover:bg-secondary/80 transition-colors"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Break Duration */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Break Time (minutes)</label>
        <div className="flex items-center gap-2">
          <button
            onClick={() => adjustDuration(breakDuration, -1, onBreakDurationChange)}
            className="p-2 rounded-md bg-secondary hover:bg-secondary/80 transition-colors"
          >
            <Minus className="w-4 h-4" />
          </button>
          <input
            type="number"
            value={breakDuration}
            onChange={(e) => {
              const value = parseInt(e.target.value);
              if (!isNaN(value) && value > 0 && value <= 60) {
                onBreakDurationChange(value);
              }
            }}
            className="flex-1 px-3 py-2 bg-background border border-input rounded-md text-center font-medium"
            min="1"
            max="60"
          />
          <button
            onClick={() => adjustDuration(breakDuration, 1, onBreakDurationChange)}
            className="p-2 rounded-md bg-secondary hover:bg-secondary/80 transition-colors"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
