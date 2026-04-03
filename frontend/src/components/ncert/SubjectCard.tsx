import { BookOpen, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Button } from '../ui/button';
import ChapterList from './ChapterList';
import type { Subject } from '../../lib/ncertData';

interface SubjectCardProps {
  subject: Subject;
}

export default function SubjectCard({ subject }: SubjectCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleToggle();
    }
  };

  return (
    <Card className="border-border/50 hover:border-border transition-colors">
      <CardHeader
        className="cursor-pointer hover:bg-accent/5 transition-colors p-4"
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        role="button"
        tabIndex={0}
        aria-expanded={isExpanded}
        aria-label={`${isExpanded ? 'Collapse' : 'Expand'} ${subject.name} chapters`}
      >
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="p-2 rounded-lg bg-primary/10 shrink-0">
              <BookOpen className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold truncate">{subject.name}</h3>
              {subject.parts && (
                <p className="text-sm text-muted-foreground">
                  {subject.parts.length} {subject.parts.length === 1 ? 'Part' : 'Parts'}
                </p>
              )}
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="gap-1 shrink-0"
            aria-label={isExpanded ? 'Hide chapters' : 'View chapters'}
          >
            <span className="text-sm hidden sm:inline">
              {isExpanded ? 'Hide' : 'View'} Chapters
            </span>
            {isExpanded ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </Button>
        </div>
      </CardHeader>
      {isExpanded && (
        <CardContent className="p-4 pt-0">
          {subject.parts ? (
            <div className="space-y-6">
              {subject.parts.map((part, index) => (
                <div key={index} className="space-y-2">
                  <h4 className="text-md font-medium text-primary mb-3">{part.name}</h4>
                  <ChapterList chapters={part.chapters} />
                </div>
              ))}
            </div>
          ) : (
            <ChapterList chapters={subject.chapters || []} />
          )}
        </CardContent>
      )}
    </Card>
  );
}
