import { BookOpen, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import ChapterList from './ChapterList';
import type { Subject } from '../../lib/ncertData';

interface SubjectCardProps {
  subject: Subject;
}

export default function SubjectCard({ subject }: SubjectCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card className="border-border/50 hover:border-border transition-colors">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <BookOpen className="h-5 w-5 text-primary" />
            </div>
            <CardTitle className="text-lg">{subject.name}</CardTitle>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="gap-1"
          >
            {isExpanded ? (
              <>
                <span className="text-sm">Hide</span>
                <ChevronUp className="h-4 w-4" />
              </>
            ) : (
              <>
                <span className="text-sm">View Chapters</span>
                <ChevronDown className="h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      </CardHeader>
      {isExpanded && (
        <CardContent>
          <ChapterList chapters={subject.chapters} />
        </CardContent>
      )}
    </Card>
  );
}
