import React from 'react';

export interface AppItem {
  id: string;
  title: string;
  developer: string;
  rating: number;
  downloads: string;
  iconUrl: string;
  bannerUrl?: string;
  description: string;
  category: string;
  isEditorChoice?: boolean;
}

export interface Category {
  id: string;
  name: string;
  icon: React.ReactNode;
}