import apiClient from './client';

export interface Deck {
  id: string;
  name: string;
  createdAt: string;
}

export interface Flashcard {
  id: string;
  deckId: string;
  kanji: string;
  reading?: string;
  meaning?: string;
  sinoVietnamese?: string;
  exampleSentence?: string;
}

export const flashcardApi = {
  getDecks: () => apiClient.get<Deck[]>('/flashcard/decks'),
  createDeck: (name: string) => apiClient.post('/flashcard/decks', { name }),
  getCards: (deckId: string) => apiClient.get<Flashcard[]>(`/flashcard/decks/${deckId}/cards`),
  addCard: (card: Partial<Flashcard>) => apiClient.post('/flashcard/cards', card),
  deleteCard: (id: string) => apiClient.delete(`/flashcard/cards/${id}`),
};
