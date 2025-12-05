import React, { useState } from 'react';

interface ConeNetProps {
  title?: string;
}

export const ConeNet: React.FC<ConeNetProps> = ({ title = "圆锥体 (Cone)" }) => {
  const [fold, setFold] = useState(0); 
  const [rotX, setRotX] = useState(-30);
  const [rotY, setRotY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (e.buttons !== 1) return;
    setRotY(prev => prev + e.movementX * 0.5);
    setRotX(prev => prev - e.movementY * 0.5);
  };

  // Geometry
  const SEGMENTS = 12;
  const HEIGHT = 140; 
  const BASE_RADIUS = 50;
  const SLANT_HEIGHT = Math.sqrt(HEIGHT*HEIGHT + BASE_RADIUS*BASE_RADIUS); 
  const SECTOR_ANGLE = 360 * (BASE_RADIUS / SLANT_HEIGHT); 
  
  const CIRCUMFERENCE = 2 * Math.PI * BASE_RADIUS;
  const SEG_BASE = CIRCUMFERENCE / SEGMENTS;

  const tiltX_folded = Math.asin(BASE_RADIUS / SLANT_HEIGHT) * (180 / Math.PI); 

  const t = fold / 100;

  const getWrapperStyle = (i: number) => {
    const centerIdx = 6;
    const offsetIdx = i - centerIdx;

    const angleY_folded = offsetIdx * (360 / SEGMENTS);
    const angleZ_unfolded = offsetIdx * (SECTOR_ANGLE / SEGMENTS);

    const curRotY = angleY_folded * (1 - t);
    const curRotX = tiltX_folded * (1 - t);
    const curRotZ = angleZ_unfolded * t;

    return {
      width: `${SEG_BASE + 2}px`, 
      height: `${SLANT_HEIGHT}px`,
      transformOrigin: 'top center',
      transform: `rotateY(${curRotY}deg) rotateX(${curRotX}deg) rotateZ(${curRotZ}deg)`,
      marginTop: `0px`,
      marginLeft: `-${(SEG_BASE+2)/2}px`, 
    };
  };

  return (
    <div className="flex flex-col items-center justify-between p-4 md:p-8 bg-purple-50 rounded-3xl border-2 border-purple-200 h-full">
      <div className="shrink-0 text-center">
         <h3 className="text-xl md:text-2xl font-bold text-purple-700 mb-1">{title}</h3>
         <p className="mb-2 text-purple-600 text-xs md:text-sm">
           观察：侧面展开是个扇形，底面是个圆形！
         </p>
      </div>

      {/* 3D Scene */}
      <div 
        className="relative w-full flex-1 min-h-[250px] cursor-grab active:cursor-grabbing perspective-800 flex items-center justify-center"
        onMouseMove={handleMouseMove}
        style={{ perspective: '800px' }}
      >
         <div className="transform scale-75 md:scale-100 transition-transform duration-300">
            <div 
              className="relative w-0 h-0 transition-transform duration-100 ease-linear"
              style={{ 
                transformStyle: 'preserve-3d', 
                transform: `rotateX(${rotX}deg) rotateY(${rotY}deg)` 
              }}
            >
              {/* Pivot Point (Apex of Cone) */}
              <div 
                className="absolute left-0 w-0 h-0" 
                style={{ 
                  transformStyle: 'preserve-3d',
                  top: `-${HEIGHT / 2}px` 
                }}
              >
                {Array.from({ length: SEGMENTS }).map((_, i) => (
                  <div
                    key={i}
                    className="absolute top-0 left-0 backface-visible"
                    style={getWrapperStyle(i)}
                  >
                    {/* Visual Triangle */}
                    <div 
                      className="w-full h-full absolute top-0 left-0"
                      style={{
                        clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
                        backgroundColor: `rgba(168, 85, 247, ${0.8 + (i%2)*0.1})`, 
                      }}
                    />

                    {/* Attach Base to center segment (index 6) */}
                    {i === 6 && (
                        <div 
                            className="absolute top-full left-1/2 rounded-full bg-green-400 border-2 border-green-600 flex items-center justify-center text-xs text-white font-bold origin-top shadow-md backface-visible"
                            style={{
                                width: `${BASE_RADIUS * 2}px`,
                                height: `${BASE_RADIUS * 2}px`,
                                marginLeft: `-${BASE_RADIUS}px`,
                                marginTop: '-1px', 
                                transform: `rotateX(${ (-90 - tiltX_folded) * (1 - t) }deg)`
                            }}
                        >
                            底面
                        </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
         </div>
      </div>

       <div className="w-full max-w-md bg-white p-3 md:p-4 rounded-xl shadow-md z-10 shrink-0">
        <div className="flex justify-between mb-2 text-xs md:text-sm font-bold">
            <span className="text-gray-500">折叠 (Folded)</span>
            <span className="text-purple-500">展开 (Net)</span>
        </div>
        <input 
          type="range" 
          min="0" 
          max="100" 
          value={fold} 
          onChange={(e) => setFold(Number(e.target.value))}
          className="w-full h-4 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-500"
        />
      </div>
    </div>
  );
};