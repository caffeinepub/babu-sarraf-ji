import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Video } from 'lucide-react';

interface StudyRoomConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function StudyRoomConfirmDialog({ open, onOpenChange }: StudyRoomConfirmDialogProps) {
  const handleProceed = () => {
    window.open('https://meet.google.com/fzn-cjad-ofe', '_blank', 'noopener,noreferrer');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Video className="h-6 w-6 text-primary" />
            </div>
            <DialogTitle className="text-xl">Study Room</DialogTitle>
          </div>
          <DialogDescription className="text-base pt-2">
            You are joining Focus Babu Study Room.
          </DialogDescription>
          <p className="text-sm text-muted-foreground pt-2">
            Join live group study session and stay focused together.
          </p>
        </DialogHeader>
        <DialogFooter className="flex-col sm:flex-row gap-2 sm:gap-0">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleProceed} className="gap-2">
            <Video className="h-4 w-4" />
            Proceed
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
