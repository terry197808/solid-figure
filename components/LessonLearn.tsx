import React, { useState } from 'react';
import { SHAPE_DATA, ShapeType } from '../types';
import { generateShapeRiddle } from '../services/geminiService';

interface LessonLearnProps {
  onNavigateToUnfold: (shape: ShapeType) => void;
}

export const LessonLearn: React.FC<LessonLearnProps> = ({ onNavigateToUnfold }) => {
  const [selectedShape, setSelectedShape] = useState<ShapeType | null>(null);
  const [riddle, setRiddle] = useState<string>("");
  const [loadingRiddle, setLoadingRiddle] = useState(false);

  const handleShapeClick = async (shapeId: ShapeType) => {
    if (selectedShape === shapeId) {
       // Optional: toggle off if needed, but keeping it selected is usually better for mobile focus
       return;
    }
    
    setSelectedShape(shapeId);
    setLoadingRiddle(true);
    setRiddle("");
    
    const newRiddle = await generateShapeRiddle(shapeId);
    setRiddle(newRiddle);
    setLoadingRiddle(false);
  };

  return (
    <div className="animate-fade-in flex flex-col h-full">
      <div className="text-center mb-4 md:mb-8 shrink-0">
        <h2 className="text-xl md:text-3xl font-bold text-gray-800 mb-1">认识新朋友 (Meet the Shapes)</h2>
        <p className="text-gray-600 text-sm md:text-lg">点击图形听听它们的自我介绍！</p>
      </div>

      {/* Shape Gallery - Horizontal Scroll on Mobile */}
      <div className="flex overflow-x-auto pb-4 gap-3 md:grid md:grid-cols-5 md:gap-4 mb-4 shrink-0 px-1 snap-x">
        {SHAPE_DATA.map((shape) => (
          <button
            key={shape.id}
            onClick={() => handleShapeClick(shape.id)}
            className={`
              relative p-3 md:p-6 rounded-2xl transition-all duration-300 transform min-w-[100px] snap-center
              flex flex-col items-center justify-center gap-2 md:gap-4 shadow-md border-b-4
              ${selectedShape === shape.id 
                ? 'bg-white ring-2 md:ring-4 ring-yellow-400 scale-105 border-yellow-500 z-10' 
                : 'bg-white border-gray-200'
              }
            `}
          >
            <div className={`text-4xl md:text-6xl filter drop-shadow-md transition-transform ${selectedShape === shape.id ? 'animate-bounce' : ''}`}>
              {shape.emoji}
            </div>
            <span className={`font-bold text-sm md:text-lg whitespace-nowrap ${selectedShape === shape.id ? 'text-yellow-600' : 'text-gray-700'}`}>
              {shape.name.split(' ')[0]}
            </span>
          </button>
        ))}
      </div>

      {/* Detail Card - Scrollable content */}
      {selectedShape ? (
        <div className="bg-white rounded-3xl p-4 md:p-8 shadow-xl border-4 border-yellow-100 animate-slide-up flex-1 overflow-y-auto">
           <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-start">
              
              {/* Visual Characteristics */}
              <div className="flex-1 w-full">
                <h3 className="text-xl md:text-3xl font-bold text-gray-800 mb-2 md:mb-4 flex items-center gap-2 md:gap-3">
                   {SHAPE_DATA.find(s => s.id === selectedShape)?.emoji}
                   {SHAPE_DATA.find(s => s.id === selectedShape)?.name}
                </h3>
                <div className="bg-yellow-50 p-3 md:p-4 rounded-xl border border-yellow-200 mb-4">
                  <h4 className="font-bold text-yellow-800 mb-2 text-sm md:text-base">它的特点：</h4>
                  <ul className="space-y-1 md:space-y-2">
                    {SHAPE_DATA.find(s => s.id === selectedShape)?.characteristics.map((char, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-gray-700 text-sm md:text-base">
                        <span className="w-2 h-2 bg-yellow-400 rounded-full shrink-0"></span>
                        {char}
                      </li>
                    ))}
                  </ul>
                </div>
                <p className="text-gray-500 italic text-sm md:text-base mb-4">
                  "{SHAPE_DATA.find(s => s.id === selectedShape)?.description}"
                </p>
                
                {/* Unfold Button */}
                <button
                  onClick={() => onNavigateToUnfold(selectedShape)}
                  className="w-full py-3 md:py-4 bg-green-500 hover:bg-green-600 text-white rounded-xl font-bold text-base md:text-lg shadow-md transition-all flex items-center justify-center gap-2 md:gap-3 animate-pulse hover:animate-none transform active:scale-95"
                >
                  <span className="text-xl md:text-2xl">📦</span> 
                  <span>把它拆开看看！</span>
                </button>
              </div>

              {/* AI Riddle Section */}
              <div className="flex-1 bg-gradient-to-br from-purple-100 to-blue-100 p-4 md:p-6 rounded-2xl w-full mt-4 md:mt-0">
                <div className="flex items-center gap-2 mb-2 md:mb-4">
                   <span className="text-xl md:text-2xl">🤖</span>
                   <h4 className="font-bold text-purple-800 text-sm md:text-base">AI 谜语时间</h4>
                </div>
                
                {loadingRiddle ? (
                  <div className="flex items-center gap-2 text-gray-500 text-sm">
                    <div className="w-3 h-3 bg-purple-400 rounded-full animate-ping"></div>
                    正在编谜语...
                  </div>
                ) : (
                  <blockquote className="text-lg md:text-xl text-purple-900 font-medium leading-relaxed font-serif">
                    “{riddle}”
                  </blockquote>
                )}
                <div className="mt-2 md:mt-4 text-right">
                   <span className="text-xs md:text-sm text-purple-400 font-bold bg-white px-2 py-1 md:px-3 rounded-full">
                     猜猜我是谁？
                   </span>
                </div>
              </div>

           </div>
        </div>
      ) : (
        <div className="text-center p-8 md:p-12 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-300 text-gray-400 flex-1 flex items-center justify-center">
          <div className="flex flex-col items-center">
            <span className="text-4xl mb-2">👆</span>
            <span>点击上面的图形开始学习吧！</span>
          </div>
        </div>
      )}
    </div>
  );
};