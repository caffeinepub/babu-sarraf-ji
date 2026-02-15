import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { FileText, Calendar } from 'lucide-react';
import { previousYearPapersCatalog } from '../../lib/previousYearPapers';
import type { PYPCatalogEntry } from '../../lib/previousYearPapers';

interface PreviousYearPapersSectionProps {
  onStart: (paperId: string) => void;
}

export default function PreviousYearPapersSection({ onStart }: PreviousYearPapersSectionProps) {
  const jeeMainPapers = previousYearPapersCatalog.filter(p => p.exam === 'JEE Main');
  const neetPapers = previousYearPapersCatalog.filter(p => p.exam === 'NEET');
  const cuetPapers = previousYearPapersCatalog.filter(p => p.exam === 'CUET');

  return (
    <section className="mb-12">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
          <FileText className="h-6 w-6 text-primary" />
          Previous Year Real Papers
        </h2>
        <p className="text-muted-foreground">
          Practice with actual previous year exam papers in real exam format
        </p>
      </div>

      <Card>
        <CardContent className="pt-6">
          {/* JEE Main Papers */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              JEE Main
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
              {jeeMainPapers.map(paper => (
                <PaperCard key={paper.id} paper={paper} onStart={onStart} />
              ))}
            </div>
          </div>

          <Separator className="my-6" />

          {/* NEET Papers */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              NEET
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
              {neetPapers.map(paper => (
                <PaperCard key={paper.id} paper={paper} onStart={onStart} />
              ))}
            </div>
          </div>

          <Separator className="my-6" />

          {/* CUET Papers */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              CUET
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
              {cuetPapers.map(paper => (
                <PaperCard key={paper.id} paper={paper} onStart={onStart} />
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}

interface PaperCardProps {
  paper: PYPCatalogEntry;
  onStart: (paperId: string) => void;
}

function PaperCard({ paper, onStart }: PaperCardProps) {
  return (
    <Card className="hover:border-primary transition-colors">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium">{paper.title}</CardTitle>
        {paper.shift && (
          <CardDescription className="text-xs">{paper.shift}</CardDescription>
        )}
      </CardHeader>
      <CardContent>
        <Button
          size="sm"
          className="w-full"
          onClick={() => onStart(paper.id)}
        >
          Start Paper
        </Button>
      </CardContent>
    </Card>
  );
}
