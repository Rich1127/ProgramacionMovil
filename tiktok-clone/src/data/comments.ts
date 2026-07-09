// Comentarios mock iniciales por video (indexados por id de video).
export type Comment = {
  id: string;
  username: string;
  avatar: string;
  text: string;
  likes: number;
};

export const initialComments: Record<string, Comment[]> = {
  '1': [
    { id: 'c1', username: 'maria_lop', avatar: 'https://i.pravatar.cc/150?img=1', text: '¡Jajaja me encanta este conejo! 🐰', likes: 45 },
    { id: 'c2', username: 'juanito99', avatar: 'https://i.pravatar.cc/150?img=3', text: 'Clásico total 🔥', likes: 12 },
  ],
  '2': [
    { id: 'c3', username: 'ana.dev', avatar: 'https://i.pravatar.cc/150?img=9', text: 'Qué animación tan bonita 😍', likes: 30 },
  ],
  '3': [
    { id: 'c4', username: 'pedro_g', avatar: 'https://i.pravatar.cc/150?img=15', text: 'Épico 🔥🔥🔥', likes: 88 },
    { id: 'c5', username: 'lucia.m', avatar: 'https://i.pravatar.cc/150?img=25', text: 'Necesito la parte 2', likes: 5 },
  ],
  '4': [
    { id: 'c6', username: 'viajero_x', avatar: 'https://i.pravatar.cc/150?img=33', text: '¿Dónde es esto? 🌍', likes: 22 },
  ],
  '5': [
    { id: 'c7', username: 'fiesta_total', avatar: 'https://i.pravatar.cc/150?img=44', text: 'Etiqué a mi bro 😂', likes: 17 },
  ],
};
