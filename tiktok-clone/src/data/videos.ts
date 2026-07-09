// Datos mock del feed "Para ti". Videos de dominio público (Google sample bucket).
export type VideoPost = {
  id: string;
  uri: string;
  username: string;
  avatar: string;
  description: string;
  music: string;
  likes: number;
  comments: number;
  shares: number;
};

export const videos: VideoPost[] = [
  {
    id: '1',
    uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    username: 'bunny_studio',
    avatar: 'https://i.pravatar.cc/150?img=12',
    description: '¡El conejo más famoso de internet 🐰 #animacion #viral',
    music: 'Sonido original - bunny_studio',
    likes: 125400,
    comments: 1820,
    shares: 940,
  },
  {
    id: '2',
    uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    username: 'dream_films',
    avatar: 'https://i.pravatar.cc/150?img=32',
    description: 'Un sueño de elefantes 🐘✨ ¿Te atreves a soñar? #cine',
    music: 'Dreamscape - Ambient Mix',
    likes: 98230,
    comments: 640,
    shares: 310,
  },
  {
    id: '3',
    uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    username: 'chrome_official',
    avatar: 'https://i.pravatar.cc/150?img=5',
    description: 'For bigger blazes 🔥 Momentos épicos #tech #trending',
    music: 'Epic Beat - Chrome',
    likes: 342100,
    comments: 4210,
    shares: 2100,
  },
  {
    id: '4',
    uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    username: 'travel_daily',
    avatar: 'https://i.pravatar.cc/150?img=48',
    description: 'Escápate conmigo a la aventura 🌍🚗 #viajes #fyp',
    music: 'Road Trip - Summer Vibes',
    likes: 56780,
    comments: 990,
    shares: 450,
  },
  {
    id: '5',
    uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    username: 'fun_zone',
    avatar: 'https://i.pravatar.cc/150?img=20',
    description: 'Solo diversión 🎉 Etiqueta a tu mejor amig@ #humor',
    music: 'Party Anthem - DJ Fun',
    likes: 210500,
    comments: 3050,
    shares: 1500,
  },
];
