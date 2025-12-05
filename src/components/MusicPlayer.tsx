import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import Icon from '@/components/ui/icon';
import { useAudioPlayer } from '@/hooks/useAudioPlayer';

interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  cover: string;
  duration: number;
  audioUrl?: string;
}

interface MusicPlayerProps {
  track: Track | null;
  onNext?: () => void;
  onPrevious?: () => void;
  onTrackEnd?: () => void;
}

export default function MusicPlayer({ track, onNext, onPrevious, onTrackEnd }: MusicPlayerProps) {
  const {
    isPlaying,
    currentTime,
    duration,
    volume,
    isMuted,
    loadTrack,
    togglePlayPause,
    seek,
    changeVolume,
    toggleMute,
  } = useAudioPlayer();

  useEffect(() => {
    if (track) {
      loadTrack(track);
    }
  }, [track]);

  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleTimeChange = (value: number[]) => {
    seek(value[0]);
  };

  const handleVolumeChange = (value: number[]) => {
    changeVolume(value[0]);
  };

  if (!track) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border px-4 py-3 z-50">
      <div className="max-w-screen-2xl mx-auto flex items-center gap-4">
        <div className="flex items-center gap-3 w-64">
          <img 
            src={track.cover} 
            alt={track.title}
            className="w-14 h-14 rounded-lg object-cover"
          />
          <div className="overflow-hidden">
            <div className="font-medium text-sm truncate">{track.title}</div>
            <div className="text-xs text-muted-foreground truncate">{track.artist}</div>
          </div>
        </div>

        <div className="flex-1 flex flex-col items-center gap-2">
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon"
              className="h-8 w-8"
              onClick={onPrevious}
            >
              <Icon name="SkipBack" size={20} />
            </Button>
            
            <Button 
              variant="default"
              size="icon"
              className="h-10 w-10 rounded-full bg-primary hover:bg-primary/90"
              onClick={togglePlayPause}
            >
              {isPlaying ? (
                <Icon name="Pause" size={20} className="text-primary-foreground" />
              ) : (
                <Icon name="Play" size={20} className="text-primary-foreground" />
              )}
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon"
              className="h-8 w-8"
              onClick={onNext}
            >
              <Icon name="SkipForward" size={20} />
            </Button>
          </div>

          <div className="w-full max-w-2xl flex items-center gap-2">
            <span className="text-xs text-muted-foreground w-10 text-right">
              {formatTime(currentTime)}
            </span>
            <Slider
              value={[currentTime]}
              max={duration || track.duration}
              step={1}
              onValueChange={handleTimeChange}
              className="flex-1"
            />
            <span className="text-xs text-muted-foreground w-10">
              {formatTime(duration || track.duration)}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 w-64 justify-end">
          <Button 
            variant="ghost" 
            size="icon"
            className="h-8 w-8"
            onClick={toggleMute}
          >
            {isMuted || volume === 0 ? (
              <Icon name="VolumeX" size={18} />
            ) : volume < 50 ? (
              <Icon name="Volume1" size={18} />
            ) : (
              <Icon name="Volume2" size={18} />
            )}
          </Button>
          <Slider
            value={[isMuted ? 0 : volume]}
            max={100}
            step={1}
            onValueChange={handleVolumeChange}
            className="w-24"
          />
        </div>
      </div>
    </div>
  );
}