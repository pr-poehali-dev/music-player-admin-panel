import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  cover: string;
  duration: number;
}

interface TrackCardProps {
  track: Track;
  onPlay: () => void;
  onAddToFavorites?: () => void;
  isFavorite?: boolean;
}

export default function TrackCard({ track, onPlay, onAddToFavorites, isFavorite }: TrackCardProps) {
  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="group relative bg-card rounded-xl p-4 hover:bg-muted transition-all duration-300 cursor-pointer">
      <div className="relative mb-4">
        <img 
          src={track.cover} 
          alt={track.title}
          className="w-full aspect-square object-cover rounded-lg"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
          <Button
            size="icon"
            className="h-14 w-14 rounded-full bg-primary hover:bg-primary/90 hover:scale-110 transition-transform"
            onClick={onPlay}
          >
            <Icon name="Play" size={24} className="text-primary-foreground ml-1" />
          </Button>
        </div>
      </div>
      
      <div className="space-y-1">
        <h3 className="font-medium text-sm truncate">{track.title}</h3>
        <p className="text-xs text-muted-foreground truncate">{track.artist}</p>
        <div className="flex items-center justify-between pt-2">
          <span className="text-xs text-muted-foreground">{formatDuration(track.duration)}</span>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={(e) => {
              e.stopPropagation();
              onAddToFavorites?.();
            }}
          >
            <Icon 
              name={isFavorite ? "Heart" : "Heart"} 
              size={16}
              className={isFavorite ? "fill-secondary text-secondary" : ""}
            />
          </Button>
        </div>
      </div>
    </div>
  );
}
