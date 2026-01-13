
export interface Lesson {
  id: string;
  title: string;
  level: 'Débutant' | 'Intermédiaire' | 'Avancé';
  description: string;
  category: 'Grammaire' | 'Vocabulaire' | 'Culture';
  duration: string;
  media?: {
    image?: string;
    video?: string;
    audio?: string;
  };
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export interface Flashcard {
  id: number;
  french: string;
  arabic: string;
  pronunciation: string;
}
