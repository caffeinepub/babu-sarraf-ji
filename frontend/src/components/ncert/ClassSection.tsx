import { ChevronDown, ChevronUp, GraduationCap } from 'lucide-react';
import { useState } from 'react';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Button } from '../ui/button';
import SubjectCard from './SubjectCard';
import type { ClassData } from '../../lib/ncertData';

interface ClassSectionProps {
  classData: ClassData;
}

export default function ClassSection({ classData }: ClassSectionProps) {
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
    <Card className="border-border/50 overflow-hidden">
      <CardHeader
        className="cursor-pointer hover:bg-accent/5 transition-colors p-4"
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        role="button"
        tabIndex={0}
        aria-expanded={isExpanded}
        aria-label={`${isExpanded ? 'Collapse' : 'Expand'} ${classData.class} section`}
      >
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <GraduationCap className="h-5 w-5 text-primary" />
            </div>
            <h2 className="text-2xl font-semibold">{classData.class}</h2>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="gap-2"
            aria-label={isExpanded ? 'Collapse' : 'Expand'}
          >
            <span className="text-sm">{isExpanded ? 'Hide' : 'Show'} Subjects</span>
            {isExpanded ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </Button>
        </div>
      </CardHeader>
      {isExpanded && (
        <CardContent className="p-4 pt-0 space-y-4">
          <SubjectCard subject={classData.subjects.physics} />
          <SubjectCard subject={classData.subjects.chemistry} />
          <SubjectCard subject={classData.subjects.biology} />
          <SubjectCard subject={classData.subjects.mathematics} />
        </CardContent>
      )}
    </Card>
  );
}
