import apiClient from './client';

export interface PaginationParams {
  pageNumber: number;
  pageSize: number;
}

export interface Content {
  id: string;
  title: string;
  slug: string;
  description?: string;
  thumbnailUrl?: string;
  audioUrl?: string;
  contentType: 'article' | 'music' | 'script';
  originalText?: string;
  isPublished: boolean;
  metadata?: any;
  createdAt: string;
}

export interface ContentLine {
  id: string;
  contentId: string;
  startTime: number;
  endTime?: number;
  textJp: string;
  textVi?: string;
  orderIndex: number;
}

export const contentApi = {
  getList: (params: PaginationParams, type?: string, categoryId?: string) =>
    apiClient.get('/content', { params: { ...params, type, categoryId } }),

  getDetail: (id: string) =>
    apiClient.get<{ content: Content; lines: ContentLine[] }>(`/content/${id}`),

  lookupWord: (word: string, context: string) =>
    apiClient.get('/content/lookup', { params: { word, context } }),

  translate: (sentence: string) =>
    apiClient.post('/content/translate', { sentence }),
};
