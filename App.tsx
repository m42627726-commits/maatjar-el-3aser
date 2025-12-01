import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { AppCard } from './components/AppCard';
import { AppDetailModal } from './components/AppDetailModal';
import { MOCK_APPS } from './constants';
import { AppItem } from './types';
import { searchAppsWithGemini } from './services/geminiService';

const App: React.FC = () => {
  const [isDark, setIsDark] = useState(false);
  const [selectedApp, setSelectedApp] = useState<AppItem | null>(null);
  const [apps, setApps] = useState<AppItem[]>(MOCK_APPS);
  const [searchResults, setSearchResults] = useState<AppItem[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [currentQuery, setCurrentQuery] = useState('');

  // Initial Theme Setup
  useEffect(() => {
    const isSystemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (isSystemDark) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  // Theme Toggle
  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  // Search Handler
  const handleSearch = async (query: string) => {
    setCurrentQuery(query);
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    
    // First, filter local apps
    const localResults = MOCK_APPS.filter(app => 
      app.title.includes(query) || 
      app.description.includes(query) ||
      app.category.includes(query)
    );

    // If we have local results, show them immediately, but also fetch from Gemini if needed for variety
    // For this demo, let's mix them or rely on Gemini if local is empty
    
    try {
      if (localResults.length < 3) {
        const geminiResults = await searchAppsWithGemini(query);
        // Deduplicate based on title approximate match could be complex, just concatenation here for demo
        setSearchResults([...localResults, ...geminiResults]);
      } else {
        setSearchResults(localResults);
      }
    } catch (e) {
      console.error(e);
      setSearchResults(localResults); // Fallback
    } finally {
      setIsSearching(false);
    }
  };

  const featuredApp = MOCK_APPS.find(a => a.id === '2'); // PUBG usually has good banner

  return (
    <div className="min-h-screen bg-white dark:bg-dark-bg transition-colors duration-300">
      
      <Header 
        isDark={isDark} 
        toggleTheme={toggleTheme} 
        onSearch={handleSearch} 
        isSearching={isSearching}
      />

      <div className="flex max-w-7xl mx-auto">
        <Sidebar />

        <main className="flex-1 w-full p-4 sm:p-6 lg:p-8 overflow-x-hidden">
          
          {/* Search Results View */}
          {currentQuery && (
            <section className="mb-10 animate-fadeIn">
              <h2 className="text-2xl font-bold mb-6 dark:text-white">نتائج البحث عن "{currentQuery}"</h2>
              {searchResults.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {searchResults.map(app => (
                    <AppCard key={app.id} app={app} onClick={setSelectedApp} variant="horizontal" />
                  ))}
                </div>
              ) : (
                !isSearching && <p className="text-gray-500">لا توجد نتائج. حاول البحث بكلمات أخرى.</p>
              )}
            </section>
          )}

          {/* Default Home View */}
          {!currentQuery && (
            <>
              {/* Hero Banner */}
              {featuredApp && (
                <section className="mb-10 relative rounded-3xl overflow-hidden shadow-xl aspect-[2/1] sm:aspect-[3/1] group cursor-pointer" onClick={() => setSelectedApp(featuredApp)}>
                  <img src={featuredApp.bannerUrl || 'https://picsum.photos/1200/400'} alt="Featured" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6 sm:p-10">
                     <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2">{featuredApp.title}</h2>
                     <p className="text-gray-200 line-clamp-1">{featuredApp.description}</p>
                     <div className="mt-4 flex gap-3">
                       <button className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-2 rounded-lg font-bold transition-colors">تثبيت</button>
                     </div>
                  </div>
                </section>
              )}

              {/* Top Rated Row */}
              <section className="mb-12">
                <div className="flex justify-between items-end mb-4">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    أعلى التقييمات
                    <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                  </h2>
                  <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">المزيد</button>
                </div>
                <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 no-scrollbar">
                  {apps.filter(a => a.rating > 4.5).map(app => (
                    <AppCard key={app.id} app={app} onClick={setSelectedApp} />
                  ))}
                </div>
              </section>

              {/* Recommended Row */}
              <section className="mb-12">
                <div className="flex justify-between items-end mb-4">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">مقترحة لك</h2>
                </div>
                <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 no-scrollbar">
                  {apps.map(app => (
                    <AppCard key={app.id} app={app} onClick={setSelectedApp} />
                  ))}
                </div>
              </section>

               {/* Categories / Quick lists */}
               <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="bg-gray-50 dark:bg-dark-surface p-4 rounded-2xl">
                     <h3 className="font-bold mb-4 dark:text-white">تطبيقات التواصل</h3>
                     <div className="space-y-3">
                       {apps.filter(a => a.category === 'تواصل').slice(0,3).map(app => (
                          <AppCard key={app.id} app={app} onClick={setSelectedApp} variant="horizontal" />
                       ))}
                     </div>
                  </div>
                   <div className="bg-gray-50 dark:bg-dark-surface p-4 rounded-2xl">
                     <h3 className="font-bold mb-4 dark:text-white">الألعاب الرائجة</h3>
                     <div className="space-y-3">
                       {apps.filter(a => a.category === 'ألعاب').slice(0,3).map(app => (
                          <AppCard key={app.id} app={app} onClick={setSelectedApp} variant="horizontal" />
                       ))}
                     </div>
                  </div>
                   <div className="bg-gray-50 dark:bg-dark-surface p-4 rounded-2xl">
                     <h3 className="font-bold mb-4 dark:text-white">أدوات مفيدة</h3>
                     <div className="space-y-3">
                       {apps.filter(a => a.category === 'أدوات' || a.category === 'خدمات').slice(0,3).map(app => (
                          <AppCard key={app.id} app={app} onClick={setSelectedApp} variant="horizontal" />
                       ))}
                     </div>
                  </div>
               </section>
            </>
          )}

        </main>
      </div>

      <AppDetailModal app={selectedApp} onClose={() => setSelectedApp(null)} />
      
      {/* Mobile Bottom Nav (Visible only on small screens) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-dark-surface border-t border-gray-200 dark:border-gray-800 flex justify-around p-3 z-40 pb-safe">
        <button className="flex flex-col items-center text-primary-600 dark:text-primary-400">
          <svg className="w-6 h-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" /></svg>
          <span className="text-xs">تطبيقات</span>
        </button>
        <button className="flex flex-col items-center text-gray-400">
           <svg className="w-6 h-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" /></svg>
           <span className="text-xs">ألعاب</span>
        </button>
        <button className="flex flex-col items-center text-gray-400">
           <svg className="w-6 h-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
           <span className="text-xs">بحث</span>
        </button>
      </div>

    </div>
  );
};

export default App;
