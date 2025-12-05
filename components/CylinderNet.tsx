import React, { useState } from 'react';

interface CylinderNetProps {
  title?: string;
}

export const CylinderNet: React.FC<CylinderNetProps> = ({ title = "圆柱体 (Cylinder)" }) => {
  const [fold, setFold] = useState(0); 
  const [rotX, setRotX] = useState(-20);
  const [rotY, setRotY] = useState(30);

  // Interaction for rotation
  const handleMouseMove = (e: React.MouseEvent) => {
    if (e.buttons !== 1) return;
    setRotY(prev => prev + e.movementX * 0.5);
    setRotX(prev => prev - e.movementY * 0.5);
  };

  // Geometry Constants
  const SEGMENTS = 20; 
  const HEIGHT = 140;
  const WIDTH_TOTAL = 260; 
  const SEGMENT_WIDTH = WIDTH_TOTAL / SEGMENTS;
  const RADIUS = WIDTH_TOTAL / (2 * Math.PI); 

  const getSegmentStyle = (i: number, t: number) => {
    const centerIdx = 10; 
    const offsetIdx = i - centerIdx;
    
    // 1. Folded State
    const anglePerSeg = 360 / SEGMENTS;
    const baseAngle = offsetIdx * anglePerSeg;
    
    // 2. Unfolded State
    const flatX = offsetIdx * (SEGMENT_WIDTH - 0.5); 

    const currentRotY = baseAngle * (1 - t);
    const currentTransZ = RADIUS * (1 - t);
    const currentTransX = flatX * t;

    return {
      width: `${SEGMENT_WIDTH + 1}px`,
      height: `${HEIGHT}px`,
      transform: `translateX(${currentTransX}px) rotateY(${currentRotY}deg) translateZ(${currentTransZ}px)`,
      backgroundColor: `rgba(96, 165, 250, ${0.8 + (i%2)*0.1})`, 
    };
  };

  const t = fold / 100;

  return (
    <div className="flex flex-col items-center justify-between p-4 md:p-8 bg-blue-50 rounded-3xl border-2 border-blue-200 h-full">
      <div className="shrink-0 text-center">
         <h3 className="text-xl md:text-2xl font-bold text-blue-700 mb-1">{title}</h3>
         <p className="mb-2 text-blue-600 text-xs md:text-sm">
           观察：上下两个圆面是黄色的，侧面展开是长方形！
         </p>
      </div>

      {/* 3D Scene */}
      <div 
        className="relative w-full flex-1 min-h-[250px] cursor-grab active:cursor-grabbing perspective-800 flex items-center justify-center overflow-visible"
        onMouseMove={handleMouseMove}
        style={{ perspective: '1000px' }}
      >
        <div className="transform scale-75 md:scale-100 transition-transform duration-300">
            <div 
              className="relative w-0 h-0 transition-transform duration-100 ease-linear"
              style={{ 
                transformStyle: 'preserve-3d', 
                transform: `rotateX(${rotX}deg) rotateY(${rotY}deg)` 
              }}
            >
              {/* Segments */}
              {Array.from({ length: SEGMENTS }).map((_, i) => (
                <div
                  key={i}
                  className="absolute top-0 left-0 origin-center border-t border-b border-blue-300/30 box-border backface-visible"
                  style={{
                    ...getSegmentStyle(i, t),
                    marginTop: `-${HEIGHT/2}px`,
                    marginLeft: `-${SEGMENT_WIDTH/2}px`,
                    transformStyle: 'preserve-3d'
                  }}
                >
                  {/* Attach Caps to the center segment (index 10) */}
                  {i === 10 && (
                    <>
                      {/* Top Cap */}
                      <div 
                        className="absolute -top-[82px] left-1/2 w-[82px] h-[82px] rounded-full bg-yellow-400 border-2 border-yellow-600 flex items-center justify-center text-xs text-yellow-900 font-bold origin-bottom transition-transform shadow-md backface-visible"
                        style={{
                          marginLeft: '-41px',
                          transform: `rotateX(${90 * (1 - t)}deg)` 
                        }}
                      >
                        顶面
                      </div>

                      {/* Bottom Cap */}
                      <div 
                        className="absolute -bottom-[82px] left-1/2 w-[82px] h-[82px] rounded-full bg-yellow-400 border-2 border-yellow-600 flex items-center justify-center text-xs text-yellow-900 font-bold origin-top transition-transform shadow-md backface-visible"
                        style={{
                          marginLeft: '-41px',
                          transform: `rotateX(${-90 * (1 - t)}deg)`
                        }}
                      >
                        底面
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
        </div>
      </div>

      <div className="w-full max-w-md bg-white p-3 md:p-4 rounded-xl shadow-md z-10 shrink-0">
        <div className="flex justify-between mb-2 text-xs md:text-sm font-bold">
            <span className="text-gray-500">折叠 (Folded)</span>
            <span className="text-blue-500">展开 (Net)</span>
        </div>
        <input 
          type="range" 
          min="0" 
          max="100" 
          value={fold} 
          onChange={(e) => setFold(Number(e.target.value))}
          className="w-full h-4 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
        />
      </div>
    </div>
  );
};