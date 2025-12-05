import { ScrollArea } from '@/components/ui/scroll-area';
import { Card } from '@/components/ui/card';

interface LyricsLine {
  time: number;
  text: string;
}

interface LyricsDisplayProps {
  lyrics: LyricsLine[];
  currentTime: number;
  className?: string;
}

export default function LyricsDisplay({ lyrics, currentTime, className = '' }: LyricsDisplayProps) {
  const getCurrentLineIndex = () => {
    for (let i = lyrics.length - 1; i >= 0; i--) {
      if (currentTime >= lyrics[i].time) {
        return i;
      }
    }
    return -1;
  };

  const currentLineIndex = getCurrentLineIndex();

  if (lyrics.length === 0) {
    return (
      <Card className={`p-8 text-center ${className}`}>
        <p className="text-muted-foreground">Текст песни недоступен</p>
      </Card>
    );
  }

  return (
    <Card className={`p-6 ${className}`}>
      <ScrollArea className="h-[400px] pr-4">
        <div className="space-y-4">
          {lyrics.map((line, index) => (
            <div
              key={index}
              className={`transition-all duration-300 ${
                index === currentLineIndex
                  ? 'text-primary text-xl font-semibold scale-105'
                  : index < currentLineIndex
                  ? 'text-muted-foreground text-base'
                  : 'text-foreground text-base opacity-60'
              }`}
            >
              {line.text}
            </div>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
}
