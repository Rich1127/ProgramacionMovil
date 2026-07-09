import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  ReactNode,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Comment, initialComments } from '../data/comments';

// Estado global de la app: likes, follows y comentarios.
// Se persiste con AsyncStorage para que sobreviva al cerrar la app.
type AppState = {
  likedIds: string[];
  followedUsers: string[];
  comments: Record<string, Comment[]>;
  isLoaded: boolean;
  toggleLike: (videoId: string) => void;
  isLiked: (videoId: string) => boolean;
  toggleFollow: (username: string) => void;
  isFollowing: (username: string) => boolean;
  addComment: (videoId: string, text: string) => void;
  getComments: (videoId: string) => Comment[];
};

const STORAGE_KEY = '@tiktok_clone_state_v1';
const CURRENT_USER = { username: 'tu_usuario', avatar: 'https://i.pravatar.cc/150?img=68' };

const AppContext = createContext<AppState | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [likedIds, setLikedIds] = useState<string[]>([]);
  const [followedUsers, setFollowedUsers] = useState<string[]>([]);
  const [comments, setComments] = useState<Record<string, Comment[]>>(initialComments);
  const [isLoaded, setIsLoaded] = useState(false);

  // Cargar estado persistido al iniciar.
  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (raw) {
          const parsed = JSON.parse(raw);
          setLikedIds(parsed.likedIds ?? []);
          setFollowedUsers(parsed.followedUsers ?? []);
          setComments(parsed.comments ?? initialComments);
        }
      } catch (e) {
        console.warn('No se pudo cargar el estado', e);
      } finally {
        setIsLoaded(true);
      }
    })();
  }, []);

  // Guardar cada vez que algo cambie (solo tras la carga inicial).
  useEffect(() => {
    if (!isLoaded) return;
    AsyncStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ likedIds, followedUsers, comments })
    ).catch((e) => console.warn('No se pudo guardar el estado', e));
  }, [likedIds, followedUsers, comments, isLoaded]);

  const toggleLike = useCallback((videoId: string) => {
    setLikedIds((prev) =>
      prev.includes(videoId) ? prev.filter((id) => id !== videoId) : [...prev, videoId]
    );
  }, []);

  const isLiked = useCallback((videoId: string) => likedIds.includes(videoId), [likedIds]);

  const toggleFollow = useCallback((username: string) => {
    setFollowedUsers((prev) =>
      prev.includes(username) ? prev.filter((u) => u !== username) : [...prev, username]
    );
  }, []);

  const isFollowing = useCallback(
    (username: string) => followedUsers.includes(username),
    [followedUsers]
  );

  const addComment = useCallback((videoId: string, text: string) => {
    const newComment: Comment = {
      id: `local-${Date.now()}`,
      username: CURRENT_USER.username,
      avatar: CURRENT_USER.avatar,
      text,
      likes: 0,
    };
    setComments((prev) => ({
      ...prev,
      [videoId]: [newComment, ...(prev[videoId] ?? [])],
    }));
  }, []);

  const getComments = useCallback(
    (videoId: string) => comments[videoId] ?? [],
    [comments]
  );

  return (
    <AppContext.Provider
      value={{
        likedIds,
        followedUsers,
        comments,
        isLoaded,
        toggleLike,
        isLiked,
        toggleFollow,
        isFollowing,
        addComment,
        getComments,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp(): AppState {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp debe usarse dentro de <AppProvider>');
  return ctx;
}
