import apiClient from './client';
import type { PaginationParams } from './contentService';

export const adminApi = {
  // Contents
  getList: (params: PaginationParams) => apiClient.get('/admin/contentmanager', { params }),
  uploadArticle: (formData: FormData) => apiClient.post('/admin/contentmanager/upload-article', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  uploadMusic: (formData: FormData) => apiClient.post('/admin/contentmanager/upload-music', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  updateStatus: (id: string, isPublished: boolean) => 
    apiClient.patch(`/admin/contentmanager/${id}/status`, null, { params: { isPublished } }),

  // Categories
  getCategories: () => apiClient.get('/category'),
  createCategory: (name: string, type: string) => apiClient.post('/category', { name, type }),
  deleteCategory: (id: string) => apiClient.delete(`/category/${id}`),
};
