import React from 'react';
import { AppItem } from '../types';

interface AppDetailModalProps {
  app: AppItem | null;
  onClose: () => void;
}

export const AppDetailModal: React.FC<AppDetailModalProps> = ({ app, onClose }) => {
  if (!app) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative w-full max-w-2xl bg-white dark:bg-dark-surface rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-fadeInUp">
        
        {/* Header Image (if exists, or nice gradient) */}
        <div className="h-32 sm:h-48 w-full bg-gradient-to-r from-primary-600 to-teal-500 relative">
          {app.bannerUrl && (
             <img src={app.bannerUrl} alt="banner" className="w-full h-full object-cover opacity-60 mix-blend-overlay" />
          )}
          <button 
            onClick={onClose}
            className="absolute top-4 end-4 p-2 bg-black/20 hover:bg-black/40 rounded-full text-white transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Info Section */}
        <div className="px-6 sm:px-8 pb-8 -mt-12 flex flex-col flex-1 overflow-y-auto">
          
          <div className="flex flex-col sm:flex-row gap-6">
            <img 
              src={app.iconUrl} 
              alt={app.title} 
              className="w-24 h-24 sm:w-32 sm:h-32 rounded-3xl shadow-xl border-4 border-white dark:border-dark-surface bg-white dark:bg-dark-surface object-cover z-10"
            />
            
            <div className="pt-2 sm:pt-14 flex-1">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">{app.title}</h2>
              <p className="text-primary-600 dark:text-primary-400 font-medium">{app.developer}</p>
              
              <div className="flex items-center gap-4 mt-3 text-sm text-gray-600 dark:text-gray-300">
                <div className="flex items-center gap-1">
                   <span className="font-bold text-black dark:text-white">{app.rating}</span>
                   <svg className="w-4 h-4 text-yellow-500 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                </div>
                <div className="w-px h-4 bg-gray-300 dark:bg-gray-600"></div>
                <div>{app.downloads} تنزيل</div>
                <div className="w-px h-4 bg-gray-300 dark:bg-gray-600"></div>
                <div>{app.category}</div>
              </div>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
             <button className="col-span-1 sm:col-span-2 py-3 px-6 bg-primary-600 hover:bg-primary-700 active:scale-95 text-white font-bold rounded-full shadow-lg shadow-primary-500/30 transition-all flex items-center justify-center gap-2">
               تثبيت
             </button>
             <button className="py-3 px-6 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 font-medium rounded-full hover:bg-gray-50 dark:hover:bg-white/5 transition-all">
               مشاركة
             </button>
          </div>

          <div className="mt-8 space-y-4">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">لمحة عن هذا التطبيق</h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm sm:text-base">
              {app.description}
            </p>
          </div>

          <div className="mt-8">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">لقطات الشاشة</h3>
            <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
               {[1,2,3].map((i) => (
                 <div key={i} className="w-32 sm:w-48 aspect-[9/16] bg-gray-200 dark:bg-zinc-700 rounded-xl flex-shrink-0 animate-pulse"></div>
               ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
