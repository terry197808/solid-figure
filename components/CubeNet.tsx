import React, { useState } from 'react';

interface CubeNetProps {
  title?: string;
  isCuboid?: boolean;
}

export const CubeNet: React.FC<CubeNetProps> = ({ title = "正方体 (Cube)", isCuboid = false }) => {
  // sliderValue: 0 = Folded (Left), 90 = Unfolded (Right)
  const [sliderValue, setSliderValue] = useState(0); 
  const [rotX, setRotX] = useState(-20);
  const [rotY, setRotY] = useState(30);

  // Calculate actual folding angle for CSS
  const currentFoldAngle = 90 - sliderValue;

  const handleMouseMove = (e: React.MouseEvent) => {
    if (e.buttons !== 1) return;
    setRotY(prev => prev + e.movementX * 0.5);
    setRotX(prev => prev - e.movementY * 0.5);
  };

  // Dimensions
  const W = 100; 
  const H = isCuboid ? 150 : 100;
  const D = isCuboid ? 60 : 100;

  // Colors
  const getColor = (faceType: 'front' | 'side' | 'top') => {
    if (isCuboid) {
        switch (faceType) {
            case 'front': return "bg-blue-500/90 border-blue-300 text-white"; 
            case 'side': return "bg-green-400/90 border-green-200 text-white"; 
            case 'top': return "bg-yellow-400/90 border-yellow-200 text-yellow-900"; 
        }
    } else {
        // Cube Colors
        switch (faceType) {
            case 'front': return "bg-red-500/90 border-red-300 text-white"; 
            case 'side': return "bg-green-400/90 border-green-200 text-white"; 
            case 'top': return "bg-yellow-400/90 border-yellow-200 text-yellow-900"; 
        }
    }
  };

  const baseFaceStyle = `absolute flex items-center justify-center text-2xl font-bold backface-visible shadow-sm border-2 transition-all duration-300`;

  return (
    <div className={`flex flex-col items-center justify-between p-4 md:p-8 rounded-3xl border-2 h-full ${isCuboid ? 'bg-blue-50 border-blue-200' : 'bg-red-50 border-red-200'}`}>
      <div className="shrink-0 text-center">
        <h3 className={`text-xl md:text-2xl font-bold mb-1 ${isCuboid ? 'text-blue-700' : 'text-red-700'}`}>{title}</h3>
        <p className={`text-xs md:text-sm ${isCuboid ? 'text-blue-600' : 'text-red-600'}`}>
          {isCuboid ? "观察：相对的面颜色一样哦！" : "观察：相对的面颜色一样！"}
        </p>
      </div>

      {/* 3D Scene Container - Scaled down on mobile */}
      <div 
        className="relative w-full flex-1 min-h-[250px] cursor-grab active:cursor-grabbing perspective-800 flex items-center justify-center overflow-hidden" 
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
              {/* 1. Center Face (Back) */}
              <div 
                className={`${baseFaceStyle} ${getColor('front')}`} 
                style={{ 
                  width: W, height: H,
                  marginLeft: -W/2, marginTop: -H/2,
                  transform: 'translateZ(0px)' 
                }}
              >1</div>

              {/* 2. Top Face (Attached to Top of 1) */}
              <div 
                className={`${baseFaceStyle} ${getColor('top')}`}
                style={{ 
                  width: W, height: D,
                  marginLeft: -W/2, 
                  top: -H/2 - D + D/2, // Shift up by D/2 to align hinge
                  marginTop: 0,
                  transformOrigin: 'bottom',
                  transform: `translateY(${-D/2}px) rotateX(${currentFoldAngle}deg)` 
                }}
              >2</div>

              {/* 3. Bottom Face (Attached to Bottom of 1) */}
              <div 
                className={`${baseFaceStyle} ${getColor('top')}`}
                style={{ 
                  width: W, height: D,
                  marginLeft: -W/2, 
                  top: H/2,
                  marginTop: 0,
                  transformOrigin: 'top',
                  // Fixed: Removed translateY to ensure edge connects with Face 1
                  transform: `rotateX(-${currentFoldAngle}deg)`,
                  transformStyle: 'preserve-3d'
                }}
              >
                3
                
                {/* 6. Front Face (Nested inside Face 3) */}
                <div 
                  className={`${baseFaceStyle} ${getColor('front')}`}
                  style={{
                    width: W, height: H,
                    top: 'calc(100% - 2px)', 
                    left: -2, 
                    transformOrigin: 'top', 
                    transform: `rotateX(-${currentFoldAngle}deg)`,
                  }}
                >6</div>
              </div>

              {/* 4. Left Face (Attached to Left of 1) */}
              <div 
                className={`${baseFaceStyle} ${getColor('side')}`}
                style={{ 
                  width: D, height: H,
                  marginLeft: -D/2, marginTop: -H/2,
                  left: -W/2,
                  transformOrigin: 'right',
                  transform: `translateX(${-D/2}px) rotateY(-${currentFoldAngle}deg)`
                }}
              >4</div>

              {/* 5. Right Face (Attached to Right of 1) */}
              <div 
                className={`${baseFaceStyle} ${getColor('side')}`}
                style={{ 
                  width: D, height: H,
                  marginLeft: -D/2, marginTop: -H/2,
                  left: W/2,
                  transformOrigin: 'left',
                  transform: `translateX(${D/2}px) rotateY(${currentFoldAngle}deg)` 
                }}
              >5</div>

            </div>
        </div>
      </div>

      <div className="w-full max-w-md bg-white p-3 md:p-4 rounded-xl shadow-md z-10 shrink-0">
        <div className="flex justify-between mb-2 text-xs md:text-sm font-bold">
            <span className="text-gray-500">折叠 (Folded)</span>
            <span className={`${isCuboid ? 'text-blue-500' : 'text-red-500'}`}>展开 (Net)</span>
        </div>
        <input 
          type="range" 
          min="0" 
          max="90" 
          value={sliderValue} 
          onChange={(e) => setSliderValue(Number(e.target.value))}
          className={`w-full h-4 bg-gray-200 rounded-lg appearance-none cursor-pointer ${isCuboid ? 'accent-blue-500' : 'accent-red-500'}`}
        />
      </div>
    </div>
  );
};