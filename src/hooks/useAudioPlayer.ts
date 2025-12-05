import { useState, useRef, useEffect } from 'react';

interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  cover: string;
  duration: number;
  audioUrl?: string;
}

export function useAudioPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(70);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    audioRef.current = new Audio();
    
    const audio = audioRef.current;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
      audio.pause();
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume / 100;
    }
  }, [volume, isMuted]);

  const loadTrack = (track: Track | null) => {
    if (!audioRef.current || !track?.audioUrl) return;
    
    audioRef.current.src = track.audioUrl;
    audioRef.current.load();
    setCurrentTime(0);
  };

  const play = async () => {
    if (!audioRef.current) return;
    
    try {
      await audioRef.current.play();
      setIsPlaying(true);
    } catch (error) {
      console.error('Error playing audio:', error);
    }
  };

  const pause = () => {
    if (!audioRef.current) return;
    
    audioRef.current.pause();
    setIsPlaying(false);
  };

  const togglePlayPause = () => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  };

  const seek = (time: number) => {
    if (!audioRef.current) return;
    
    audioRef.current.currentTime = time;
    setCurrentTime(time);
  };

  const changeVolume = (newVolume: number) => {
    setVolume(newVolume);
    if (newVolume > 0) setIsMuted(false);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return {
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
    play,
    pause,
  };
}
