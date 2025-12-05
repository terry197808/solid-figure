import React, { useState, useEffect } from 'react';
import { CubeNet } from './CubeNet';
import { CylinderNet } from './CylinderNet';
import { ConeNet } from './ConeNet';
import { ShapeType, SHAPE_DATA } from '../types';

interface LessonUnfoldProps {
  initialShape?: ShapeType | null;
}

export const LessonUnfold: React.FC<LessonUnfoldProps> = ({ initialShape }) => {
  const [activeShape, setActiveShape] = useState<ShapeType>(ShapeType.CUBE);

  useEffect(() => {
    if (initialShape) {
      setActiveShape(initialShape);
    }
  }, [initialShape]);

  const renderContent = () => {
    switch (activeShape) {
      case ShapeType.CUBE:
        return <CubeNet key="cube" title="正方体变变变！" />;
      case ShapeType.CUBOID:
        return <CubeNet key="cuboid" title="长方体变变变！" isCuboid={true} />;
      case ShapeType.CYLINDER:
        return <CylinderNet key="cylinder" />;
      case ShapeType.CONE:
        return <ConeNet key="cone" />;
      case ShapeType.SPHERE:
        return (
          <div key="sphere" className="bg-white p-6 md:p-12 rounded-3xl shadow-lg border-b-8 border-yellow-100 flex flex-col items-center justify-center h-full min-h-[300px]">
             <div className="relative w-32 h-32 md:w-48 md:h-48 mb-4 md:mb-8">
               <div className="absolute inset-0 bg-yellow-400 rounded-full animate-bounce shadow-xl flex items-center justify-center text-6xl md:text-8xl text-yellow-100 overflow-hidden">
                 <div className="absolute inset-0 bg-gradient-to-tr from-yellow-600/20 to-transparent"></div>
                 ⚽
               </div>
             </div>
             <h3 className="text-xl md:text-3xl font-bold text-yellow-600 mb-2 md:mb-4">球体不能展开哦！</h3>
             <p className="text-sm md:text-xl text-gray-500 max-w-md text-center leading-relaxed px-4">
               球体是完美的曲面，没有平平的面，所以没法像纸盒一样剪开铺平。
             </p>
          </div>
        );
      default:
        return <div>Select a shape</div>;
    }
  };

  return (
    <div className="animate-fade-in flex flex-col h-full">
      <div className="text-center mb-4 shrink-0">
        <h2 className="text-xl md:text-3xl font-bold text-gray-800 mb-1">神奇的变身 (Transformation)</h2>
        <p className="text-gray-600 text-sm md:text-lg">拖动滑块，看看平面图形是怎么变成大家伙的！</p>
      </div>

      {/* Shape Selector Tabs - Horizontal Scroll on Mobile */}
      <div className="flex overflow-x-auto gap-2 md:gap-3 mb-4 shrink-0 bg-slate-50/90 backdrop-blur-sm p-2 rounded-xl border border-gray-100 shadow-sm md:flex-wrap md:justify-center">
        {SHAPE_DATA.map((shape) => (
          <button
            key={shape.id}
            onClick={() => setActiveShape(shape.id)}
            className={`px-4 py-2 rounded-full text-sm md:text-base font-bold transition-all flex items-center gap-2 transform active:scale-95 whitespace-nowrap ${
              activeShape === shape.id 
                ? 'bg-gray-800 text-white shadow-lg scale-105 ring-2 ring-offset-2 ring-gray-300' 
                : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200 hover:shadow'
            }`}
          >
            <span className="text-lg md:text-xl">{shape.emoji}</span>
            {shape.name.split(' ')[0]}
          </button>
        ))}
      </div>

      {/* Content Area - Flexible Height */}
      <div className="w-full max-w-4xl mx-auto flex-1 flex flex-col min-h-0">
         {renderContent()}
      </div>
    </div>
  );
};