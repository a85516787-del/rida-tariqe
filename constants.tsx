
import { Lesson, Flashcard } from './types';

// We now leave LESSONS empty as requested by the user to focus on creation
export const LESSONS: Lesson[] = [];

export const FLASHCARDS: Flashcard[] = [
  { id: 1, french: 'La Pomme', arabic: 'التفاحة', pronunciation: '/la pɔm/' },
  { id: 2, french: 'Le Château', arabic: 'القلعة', pronunciation: '/lə ʃɑto/' },
  { id: 3, french: 'Bienvenue', arabic: 'أهلاً بك', pronunciation: '/bjɛ̃vny/' },
  { id: 4, french: 'L\'espoir', arabic: 'الأمل', pronunciation: '/lɛspwaʁ/' },
  { id: 5, french: 'Émerveillé', arabic: 'منبهر', pronunciation: '/emɛʁvɛje/' }
];
