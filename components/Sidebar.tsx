import React from 'react';

const NAV_ITEMS = [
  { name: 'التطبيقات', icon: 'M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z', active: true },
  { name: 'الألعاب', icon: 'M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z', active: false },
  { name: 'الأفلام', icon: 'M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h1.5C5.496 19.5 6 18.996 6 18.375m-3.75 1.125V18A2.25 2.25 0 014.5 15.75H6m3.75 3.75h1.5C11.496 19.5 12 18.996 12 18.375m-3.75 1.125V18a2.25 2.25 0 012.25-2.25H12m3.75 3.75h1.5c.621 0 1.125-.504 1.125-1.125m-3.75 1.125V18a2.25 2.25 0 012.25-2.25h1.5m-1.5 3.75h-1.5A1.125 1.125 0 0118 18.375M19.5 19.5a1.125 1.125 0 001.125-1.125m-2.25 0v-1.5a2.25 2.25 0 00-2.25-2.25H18', active: false },
  { name: 'الكتب', icon: 'M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25', active: false },
];

export const Sidebar: React.FC = () => {
  return (
    <aside className="hidden lg:flex flex-col w-64 h-[calc(100vh-64px)] sticky top-16 ps-4 pt-6 overflow-y-auto no-scrollbar">
      <nav className="space-y-1">
        {NAV_ITEMS.map((item) => (
          <a
            key={item.name}
            href="#"
            className={`flex items-center px-6 py-3.5 text-sm font-medium rounded-e-full transition-colors ${
              item.active 
                ? 'bg-primary-50 text-primary-600 dark:bg-primary-500/10 dark:text-primary-400' 
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5'
            }`}
          >
            <svg 
              className={`me-4 h-6 w-6 ${item.active ? 'text-primary-600 dark:text-primary-400' : 'text-gray-400'}`} 
              xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
            </svg>
            {item.name}
          </a>
        ))}
      </nav>

      <div className="mt-8 px-6">
         <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">التصنيفات</h4>
         <div className="space-y-3">
            {['أدوات', 'اجتماعي', 'إنتاجية', 'تصوير', 'ترفيه'].map(cat => (
              <a key={cat} href="#" className="block text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                {cat}
              </a>
            ))}
         </div>
      </div>
    </aside>
  );
};
