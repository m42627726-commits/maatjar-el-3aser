import React from 'react';
import { AppItem } from '../types';

interface AppCardProps {
  app: AppItem;
  onClick: (app: AppItem) => void;
  variant?: 'vertical' | 'horizontal';
}

export const AppCard: React.FC<AppCardProps> = ({ app, onClick, variant = 'vertical' }) => {
  if (variant === 'horizontal') {
    return (
       <div 
        onClick={() => onClick(app)}
        className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 cursor-pointer transition-colors w-full min-w-[280px]"
      >
        <img 
          src={app.iconUrl} 
          alt={app.title} 
          className="w-16 h-16 rounded-2xl shadow-sm object-cover bg-gray-100 dark:bg-gray-800"
          loading="lazy"
        />
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white truncate">{app.title}</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{app.category} • {app.rating} ★</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      onClick={() => onClick(app)}
      className="flex flex-col gap-2 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 cursor-pointer transition-all duration-200 group w-[120px] sm:w-[160px] flex-shrink-0"
    >
      <div className="relative">
        <img 
          src={app.iconUrl} 
          alt={app.title} 
          className="w-full aspect-square rounded-2xl shadow-md group-hover:shadow-lg transition-shadow object-cover bg-gray-100 dark:bg-gray-800"
          loading="lazy"
        />
        <div className="absolute inset-0 rounded-2xl bg-black/0 group-hover:bg-black/5 dark:group-hover:bg-white/5 transition-colors" />
      </div>
      <div className="mt-1">
        <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate text-start" title={app.title}>{app.title}</h3>
        <div className="flex items-center gap-1 mt-0.5">
           <span className="text-xs text-gray-500 dark:text-gray-400">{app.rating} ★</span>
        </div>
      </div>
    </div>
  );
};
