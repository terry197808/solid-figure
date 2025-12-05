import React, { useState } from 'react';
import { NavBar } from './components/NavBar';
import { LessonLearn } from './components/LessonLearn';
import { LessonUnfold } from './components/LessonUnfold';
import { QuizTime } from './components/QuizTime';
import { ShapeType } from './types';

const App: React.FC = () => {
  const [currentTab, setCurrentTab] = useState('learn');
  const [unfoldShape, setUnfoldShape] = useState<ShapeType | null>(null);

  const handleNavigateToUnfold = (shape: ShapeType) => {
    setUnfoldShape(shape);
    setCurrentTab('unfold');
  };

  return (
    <div className="h-[100dvh] flex flex-col bg-slate-50 font-sans text-slate-900 selection:bg-yellow-200 overflow-hidden">
      
      {/* Header - Compact on mobile */}
      <header className="bg-white border-b-4 border-yellow-400 shadow-sm shrink-0 z-50">
        <div className="max-w-5xl mx-auto px-3 py-2 md:py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 md:gap-3">
             <div className="w-8 h-8 md:w-12 md:h-12 bg-yellow-400 rounded-lg md:rounded-xl flex items-center justify-center text-xl md:text-3xl shadow-inner">
               🚀
             </div>
             <div>
               <h1 className="text-lg md:text-2xl font-black text-gray-800 tracking-tight leading-tight">奇妙图形探险队</h1>
               <p className="text-[10px] md:text-xs text-gray-500 font-bold uppercase tracking-widest hidden sm:block">Grade 1 Math Adventure</p>
             </div>
          </div>
          <div className="hidden sm:block text-right">
            <p className="text-sm text-gray-400">一年级数学 · 上册</p>
            <p className="text-sm font-bold text-gray-600">认识立体图形</p>
          </div>
        </div>
      </header>

      {/* Main Content - Scrollable Area */}
      <main className="flex-1 overflow-y-auto overflow-x-hidden w-full max-w-5xl mx-auto px-2 py-2 md:px-4 md:py-8">
        
        <NavBar currentTab={currentTab} setTab={setCurrentTab} />

        <div className="h-full">
          {currentTab === 'learn' && <LessonLearn onNavigateToUnfold={handleNavigateToUnfold} />}
          {currentTab === 'unfold' && <LessonUnfold initialShape={unfoldShape} />}
          {currentTab === 'quiz' && <QuizTime />}
        </div>

      </main>

      {/* Footer - Hidden on mobile to save space */}
      <footer className="bg-white border-t border-gray-200 py-4 text-center text-gray-400 text-sm shrink-0 hidden md:block">
         <p>© 2024 Math Explorers. Designed for Kids.</p>
         <p className="mt-1 text-xs">Powered by React & Gemini</p>
      </footer>
    </div>
  );
};

export default App;