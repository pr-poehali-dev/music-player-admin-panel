import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import MusicPlayer from '@/components/MusicPlayer';
import TrackCard from '@/components/TrackCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  cover: string;
  duration: number;
  audioUrl?: string;
}

const mockTracks: Track[] = [
  {
    id: '1',
    title: 'Ночной город',
    artist: 'Артем Волков',
    album: 'Городские огни',
    cover: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop',
    duration: 234,
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
  },
  {
    id: '2',
    title: 'Летний дождь',
    artist: 'Мария Светлова',
    album: 'Времена года',
    cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
    duration: 198,
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3'
  },
  {
    id: '3',
    title: 'Космический рейс',
    artist: 'DJ Nebula',
    album: 'Space Journey',
    cover: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=300&h=300&fit=crop',
    duration: 312,
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3'
  },
  {
    id: '4',
    title: 'Рассвет над морем',
    artist: 'Анна Морская',
    album: 'Берег мечты',
    cover: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300&h=300&fit=crop',
    duration: 267,
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3'
  },
  {
    id: '5',
    title: 'Танцы до утра',
    artist: 'Beat Masters',
    album: 'Club Hits 2024',
    cover: 'https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=300&h=300&fit=crop',
    duration: 189,
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3'
  },
  {
    id: '6',
    title: 'Тишина',
    artist: 'Павел Тихонов',
    album: 'Акустика',
    cover: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=300&h=300&fit=crop',
    duration: 245,
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3'
  }
];

export default function MusicApp() {
  const [currentPage, setCurrentPage] = useState('home');
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [favorites, setFavorites] = useState<string[]>(['1', '3']);
  const [playlists] = useState([
    { id: '1', name: 'Любимые треки', tracks: 12, cover: mockTracks[0].cover },
    { id: '2', name: 'Для работы', tracks: 24, cover: mockTracks[1].cover },
    { id: '3', name: 'Вечерняя музыка', tracks: 18, cover: mockTracks[2].cover },
  ]);

  const [newTrackForm, setNewTrackForm] = useState({
    title: '',
    artist: '',
    album: '',
    cover: '',
    duration: 0
  });

  const handlePlayTrack = (track: Track) => {
    setCurrentTrack(track);
  };

  const toggleFavorite = (trackId: string) => {
    setFavorites(prev => 
      prev.includes(trackId) 
        ? prev.filter(id => id !== trackId)
        : [...prev, trackId]
    );
  };

  const handleNextTrack = () => {
    if (!currentTrack) return;
    const currentIndex = mockTracks.findIndex(t => t.id === currentTrack.id);
    const nextIndex = (currentIndex + 1) % mockTracks.length;
    setCurrentTrack(mockTracks[nextIndex]);
  };

  const handlePreviousTrack = () => {
    if (!currentTrack) return;
    const currentIndex = mockTracks.findIndex(t => t.id === currentTrack.id);
    const prevIndex = currentIndex === 0 ? mockTracks.length - 1 : currentIndex - 1;
    setCurrentTrack(mockTracks[prevIndex]);
  };

  const renderHome = () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold mb-6">Рекомендации для вас</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {mockTracks.map((track) => (
            <TrackCard
              key={track.id}
              track={track}
              onPlay={() => handlePlayTrack(track)}
              onAddToFavorites={() => toggleFavorite(track.id)}
              isFavorite={favorites.includes(track.id)}
            />
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Популярные плейлисты</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {playlists.map((playlist) => (
            <Card key={playlist.id} className="hover:bg-muted transition-colors cursor-pointer group">
              <CardContent className="p-4">
                <img src={playlist.cover} alt={playlist.name} className="w-full aspect-square object-cover rounded-lg mb-3" />
                <h3 className="font-medium truncate">{playlist.name}</h3>
                <p className="text-sm text-muted-foreground">{playlist.tracks} треков</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );

  const renderPlayer = () => (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">Сейчас играет</h2>
      {currentTrack ? (
        <div className="max-w-2xl mx-auto">
          <Card className="p-8">
            <div className="flex flex-col items-center space-y-6">
              <img 
                src={currentTrack.cover} 
                alt={currentTrack.title}
                className="w-80 h-80 object-cover rounded-2xl shadow-2xl"
              />
              <div className="text-center">
                <h3 className="text-3xl font-bold mb-2">{currentTrack.title}</h3>
                <p className="text-xl text-muted-foreground">{currentTrack.artist}</p>
                <p className="text-sm text-muted-foreground mt-1">{currentTrack.album}</p>
              </div>
            </div>
          </Card>
        </div>
      ) : (
        <Card className="p-12 text-center">
          <Icon name="Music" size={64} className="mx-auto mb-4 text-muted-foreground" />
          <p className="text-muted-foreground">Выберите трек для воспроизведения</p>
        </Card>
      )}
    </div>
  );

  const renderPlaylists = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">Мои плейлисты</h2>
        <Button className="gap-2">
          <Icon name="Plus" size={20} />
          Создать плейлист
        </Button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {playlists.map((playlist) => (
          <Card key={playlist.id} className="hover:bg-muted transition-colors cursor-pointer group">
            <CardContent className="p-4">
              <div className="relative mb-3">
                <img src={playlist.cover} alt={playlist.name} className="w-full aspect-square object-cover rounded-lg" />
                <Button
                  size="icon"
                  className="absolute bottom-2 right-2 h-12 w-12 rounded-full bg-primary hover:bg-primary/90 opacity-0 group-hover:opacity-100 transition-all shadow-lg"
                >
                  <Icon name="Play" size={20} className="text-primary-foreground ml-1" />
                </Button>
              </div>
              <h3 className="font-medium truncate">{playlist.name}</h3>
              <p className="text-sm text-muted-foreground">{playlist.tracks} треков</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderFavorites = () => {
    const favoriteTracks = mockTracks.filter(track => favorites.includes(track.id));
    
    return (
      <div className="space-y-6">
        <h2 className="text-3xl font-bold">Избранное</h2>
        {favoriteTracks.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {favoriteTracks.map((track) => (
              <TrackCard
                key={track.id}
                track={track}
                onPlay={() => handlePlayTrack(track)}
                onAddToFavorites={() => toggleFavorite(track.id)}
                isFavorite={true}
              />
            ))}
          </div>
        ) : (
          <Card className="p-12 text-center">
            <Icon name="Heart" size={64} className="mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground">У вас пока нет избранных треков</p>
          </Card>
        )}
      </div>
    );
  };

  const renderProfile = () => (
    <div className="space-y-6 max-w-4xl">
      <h2 className="text-3xl font-bold">Личный кабинет</h2>
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="profile">Профиль</TabsTrigger>
          <TabsTrigger value="subscription">Подписка</TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Информация профиля</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-full bg-accent flex items-center justify-center text-2xl font-bold">
                  ИВ
                </div>
                <Button variant="outline">Изменить фото</Button>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Имя</label>
                <Input defaultValue="Иван Петров" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <Input type="email" defaultValue="ivan@example.com" />
              </div>
              <Button>Сохранить изменения</Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="subscription" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Premium подписка</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                <div>
                  <p className="font-medium">Текущий тариф</p>
                  <p className="text-2xl font-bold text-primary">Premium</p>
                </div>
                <Icon name="Crown" size={48} className="text-primary" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Icon name="Check" size={16} className="text-primary" />
                  <span>Без рекламы</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Icon name="Check" size={16} className="text-primary" />
                  <span>Высокое качество звука</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Icon name="Check" size={16} className="text-primary" />
                  <span>Офлайн-режим</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );

  const renderAdmin = () => (
    <div className="space-y-6 max-w-4xl">
      <h2 className="text-3xl font-bold">Панель администрации</h2>
      
      <Card>
        <CardHeader>
          <CardTitle>Добавить новый трек</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Название трека</label>
            <Input 
              placeholder="Например: Ночной город"
              value={newTrackForm.title}
              onChange={(e) => setNewTrackForm({...newTrackForm, title: e.target.value})}
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Исполнитель</label>
            <Input 
              placeholder="Например: Артем Волков"
              value={newTrackForm.artist}
              onChange={(e) => setNewTrackForm({...newTrackForm, artist: e.target.value})}
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Альбом</label>
            <Input 
              placeholder="Например: Городские огни"
              value={newTrackForm.album}
              onChange={(e) => setNewTrackForm({...newTrackForm, album: e.target.value})}
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Ссылка на обложку</label>
            <Input 
              placeholder="https://example.com/cover.jpg"
              value={newTrackForm.cover}
              onChange={(e) => setNewTrackForm({...newTrackForm, cover: e.target.value})}
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Длительность (секунды)</label>
            <Input 
              type="number"
              placeholder="234"
              value={newTrackForm.duration || ''}
              onChange={(e) => setNewTrackForm({...newTrackForm, duration: parseInt(e.target.value) || 0})}
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Аудиофайл</label>
            <Input type="file" accept="audio/*" />
          </div>
          
          <Button className="w-full gap-2">
            <Icon name="Upload" size={20} />
            Загрузить трек
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Загруженные треки</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {mockTracks.map((track) => (
              <div key={track.id} className="flex items-center gap-4 p-3 bg-muted rounded-lg hover:bg-muted/70 transition-colors">
                <img src={track.cover} alt={track.title} className="w-12 h-12 rounded object-cover" />
                <div className="flex-1">
                  <p className="font-medium">{track.title}</p>
                  <p className="text-sm text-muted-foreground">{track.artist}</p>
                </div>
                <Button variant="ghost" size="icon">
                  <Icon name="Trash2" size={18} />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderContent = () => {
    switch (currentPage) {
      case 'home': return renderHome();
      case 'player': return renderPlayer();
      case 'playlists': return renderPlaylists();
      case 'favorites': return renderFavorites();
      case 'profile': return renderProfile();
      case 'admin': return renderAdmin();
      default: return renderHome();
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Sidebar currentPage={currentPage} onNavigate={setCurrentPage} />
      
      <main className="ml-64 p-8 pb-32">
        {renderContent()}
      </main>

      <MusicPlayer 
        track={currentTrack} 
        onNext={handleNextTrack}
        onPrevious={handlePreviousTrack}
      />
    </div>
  );
}