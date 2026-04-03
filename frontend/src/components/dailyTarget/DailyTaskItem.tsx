import { useState } from 'react';
import { Checkbox } from '../ui/checkbox';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Pencil, Trash2, Check, X } from 'lucide-react';

interface Task {
  id: string;
  text: string;
  completed: boolean;
}

interface DailyTaskItemProps {
  task: Task;
  onToggle: (taskId: string, completed: boolean) => void;
  onEdit: (taskId: string, text: string) => void;
  onDelete: (taskId: string) => void;
  isUpdating: boolean;
  isDeleting: boolean;
}

export default function DailyTaskItem({
  task,
  onToggle,
  onEdit,
  onDelete,
  isUpdating,
  isDeleting,
}: DailyTaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);

  const handleSaveEdit = () => {
    if (editText.trim() && editText !== task.text) {
      onEdit(task.id, editText.trim());
    }
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditText(task.text);
    setIsEditing(false);
  };

  return (
    <div className="flex items-center gap-3 p-3 rounded-lg border border-border bg-background/50 hover:bg-background/80 transition-colors">
      {/* Checkbox */}
      <Checkbox
        checked={task.completed}
        onCheckedChange={(checked) => onToggle(task.id, checked as boolean)}
        disabled={isUpdating || isDeleting}
        className="flex-shrink-0"
      />

      {/* Task text or edit input */}
      {isEditing ? (
        <div className="flex-1 flex items-center gap-2">
          <Input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSaveEdit();
              } else if (e.key === 'Escape') {
                handleCancelEdit();
              }
            }}
            className="flex-1"
            autoFocus
          />
          <Button size="icon" variant="ghost" onClick={handleSaveEdit} className="h-8 w-8 flex-shrink-0">
            <Check className="h-4 w-4" />
          </Button>
          <Button size="icon" variant="ghost" onClick={handleCancelEdit} className="h-8 w-8 flex-shrink-0">
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <>
          <span
            className={`flex-1 ${
              task.completed ? 'line-through text-muted-foreground' : 'text-foreground'
            }`}
          >
            {task.text}
          </span>

          {/* Action buttons */}
          <div className="flex items-center gap-1 flex-shrink-0">
            <Button
              size="icon"
              variant="ghost"
              onClick={() => setIsEditing(true)}
              disabled={isUpdating || isDeleting}
              className="h-8 w-8"
            >
              <Pencil className="h-4 w-4" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => onDelete(task.id)}
              disabled={isUpdating || isDeleting}
              className="h-8 w-8 text-destructive hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
