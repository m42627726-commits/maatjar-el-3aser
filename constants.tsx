import React from 'react';
import { AppItem, Category } from './types';

// Helper to generate icons using a service or picsum
const getIcon = (seed: string) => `https://api.dicebear.com/7.x/initials/svg?seed=${seed}&backgroundColor=22c55e`;
const getImage = (id: number) => `https://picsum.photos/id/${id}/400/250`;

export const MOCK_APPS: AppItem[] = [
  {
    id: '1',
    title: 'واتساب الذهبي',
    developer: 'Meta Inc.',
    rating: 4.8,
    downloads: '٥ مليار+',
    iconUrl: getIcon('WA'),
    description: 'تطبيق المراسلة الأكثر شهرة في العالم. تواصل مع الأصدقاء والعائلة بسهولة وسرعة.',
    category: 'تواصل',
    bannerUrl: getImage(10),
    isEditorChoice: true
  },
  {
    id: '2',
    title: 'ببجي موبايل',
    developer: 'Tencent Games',
    rating: 4.5,
    downloads: '٥٠٠ مليون+',
    iconUrl: getIcon('PUBG'),
    description: 'لعبة البقاء على قيد الحياة الشهيرة. انضم إلى المعركة وكن الناجي الأخير.',
    category: 'ألعاب',
    bannerUrl: getImage(15),
    isEditorChoice: true
  },
  {
    id: '3',
    title: 'المصمم العربي',
    developer: 'Arab Design Studio',
    rating: 4.7,
    downloads: '١٠ مليون+',
    iconUrl: getIcon('Des'),
    description: 'أفضل تطبيق للكتابة على الصور باللغة العربية مع خطوط عربية مميزة.',
    category: 'أدوات',
    bannerUrl: getImage(20)
  },
  {
    id: '4',
    title: 'تيك توك',
    developer: 'TikTok Pte. Ltd.',
    rating: 4.6,
    downloads: '١ مليار+',
    iconUrl: getIcon('TT'),
    description: 'مقاطع فيديو قصيرة وممتعة. اكتشف العالم من خلال الفيديوهات.',
    category: 'ترفيه',
    bannerUrl: getImage(25)
  },
  {
    id: '5',
    title: 'حصن المسلم',
    developer: 'Islamic Apps',
    rating: 4.9,
    downloads: '٥٠ مليون+',
    iconUrl: getIcon('Ism'),
    description: 'أذكار وأدعية من الكتاب والسنة لا غنى عنها في حياة المسلم اليومية.',
    category: 'تعليم',
    bannerUrl: getImage(30)
  },
  {
    id: '6',
    title: 'كريم - Careem',
    developer: 'Careem',
    rating: 4.4,
    downloads: '٥٠ مليون+',
    iconUrl: getIcon('Car'),
    description: 'تطبيق التوصيل الأول في الشرق الأوسط. اطلب سيارة، طعام، أو أي شيء.',
    category: 'خدمات',
    bannerUrl: getImage(35)
  },
  {
    id: '7',
    title: 'نون للتسوق',
    developer: 'Noon E-commerce',
    rating: 4.3,
    downloads: '٢٠ مليون+',
    iconUrl: getIcon('Noon'),
    description: 'تسوق الأزياء، الإلكترونيات، والمزيد مع توصيل سريع.',
    category: 'تسوق',
    bannerUrl: getImage(40)
  },
  {
    id: '8',
    title: 'شاهد',
    developer: 'MBC Group',
    rating: 4.2,
    downloads: '٥٠ مليون+',
    iconUrl: getIcon('Shahid'),
    description: 'منصة البث العربية الرائدة. مسلسلات وأفلام حصرية.',
    category: 'ترفيه'
  },
    {
    id: '9',
    title: 'مرسول',
    developer: 'Mrsool Inc',
    rating: 4.6,
    downloads: '١٥ مليون+',
    iconUrl: getIcon('Mrsool'),
    description: 'تجربة توصيل فريدة من نوعها. اطلب أي شيء من أي مكان.',
    category: 'خدمات'
  },
   {
    id: '10',
    title: 'القرآن الكريم',
    developer: 'KSU',
    rating: 5.0,
    downloads: '١٠٠ مليون+',
    iconUrl: getIcon('Quran'),
    description: 'تطبيق القرآن الكريم بمميزات فريدة للقراءة والاستماع.',
    category: 'تعليم'
  }
];
