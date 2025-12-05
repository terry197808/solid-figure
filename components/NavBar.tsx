import React from 'react';

interface NavBarProps {
  currentTab: string;
  setTab: (tab: string) => void;
}

export const NavBar: React.FC<NavBarProps> = ({ currentTab, setTab }) => {
  const tabs = [
    { id: 'learn', label: '👀 认一认', color: 'bg-blue-500' },
    { id: 'unfold', label: '📦 拆一拆', color: 'bg-green-500' },
    { id: 'quiz', label: '✨ 猜一猜', color: 'bg-purple-500' },
  ];

  return (
    <nav className="flex justify-center gap-2 md:gap-4 p-2 md:p-4 mb-2 md:mb-6 bg-white rounded-xl md:rounded-2xl shadow-sm shrink-0">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setTab(tab.id)}
          className={`px-3 py-2 md:px-6 md:py-3 rounded-full text-sm md:text-lg font-bold transition-all transform hover:scale-105 active:scale-95 text-white shadow-md whitespace-nowrap ${
            currentTab === tab.id ? `${tab.color} ring-2 md:ring-4 ring-offset-2 ring-opacity-50 ring-${tab.color.split('-')[1]}-300` : 'bg-gray-300 hover:bg-gray-400'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </nav>
  );
};