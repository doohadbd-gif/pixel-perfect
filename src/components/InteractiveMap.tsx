import { useState } from 'react';
import { LANDMARKS, Landmark } from '@/data/landmarks';
import LandmarkPin from './LandmarkPin';
import StoryPopup from './StoryPopup';
import MoreStoriesPopup from './MoreStoriesPopup';

const InteractiveMap = () => {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [selectedLandmark, setSelectedLandmark] = useState<Landmark | null>(null);
  const [showMoreStories, setShowMoreStories] = useState(false);
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.2, 2));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.2, 1));
  };

  return (
    <div className="min-h-screen w-full relative">
      
      {/* Background Pattern */}
      <div className="fixed inset-0 -z-10">
        <img 
          src="/background-pattern.png"
          alt="Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-blue-600/30" />
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center min-h-screen p-4 md:p-8">
        
        {/* Header */}
        <div className="text-center mb-6 md:mb-8">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-2 drop-shadow-lg">
            Bank Asia Tales of People
          </h1>
          <p className="text-base md:text-lg text-blue-100">
            Click on division pins to hear inspiring customer stories
          </p>
        </div>

        {/* Map Container */}
        <div className="relative w-full max-w-4xl">
          <div className="bg-white/95 backdrop-blur rounded-2xl shadow-2xl p-4 md:p-6 relative overflow-hidden">
            
            {/* Map with Zoom Transform */}
            <div 
              className="relative w-full transition-transform duration-300 ease-out overflow-hidden"
              style={{
                transform: `scale(${zoomLevel})`,
                transformOrigin: 'center center',
              }}
            >
              {/* Map Image (SVG) */}
              <img 
                src="/bangladesh-map.svg"
                alt="Bangladesh Map"
                className="w-full h-auto object-contain select-none"
                draggable="false"
              />

              {/* Landmarks Overlay */}
              <div className="absolute inset-0 pointer-events-none">
                {LANDMARKS.map((landmark) => (
                  <LandmarkPin
                    key={landmark.id}
                    landmark={landmark}
                    isHovered={hoveredId === landmark.id}
                    onHover={() => setHoveredId(landmark.id)}
                    onLeave={() => setHoveredId(null)}
                    onClick={() => setSelectedLandmark(landmark)}
                  />
                ))}
              </div>

              {/* Hover Glow Effect */}
              {hoveredId && (
                <div 
                  className="absolute rounded-full bg-cyan-400/30 blur-xl animate-pulse pointer-events-none"
                  style={{
                    left: LANDMARKS.find(l => l.id === hoveredId)?.position.left,
                    top: LANDMARKS.find(l => l.id === hoveredId)?.position.top,
                    width: '100px',
                    height: '100px',
                    transform: 'translate(-50%, -50%)'
                  }}
                />
              )}
            </div>

            {/* Bank Asia Logo */}
            <div className="absolute bottom-4 left-4 z-10">
              <img 
                src="/bankasia-logo.webp"
                alt="Bank Asia"
                className="h-8 md:h-10 opacity-90"
              />
            </div>

            {/* Zoom Controls */}
            <div className="absolute bottom-4 right-4 z-10 flex flex-col gap-2">
              <button
                onClick={handleZoomIn}
                disabled={zoomLevel >= 2}
                className="w-10 h-10 bg-white rounded-lg shadow-lg flex items-center justify-center hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-gray-700 font-bold text-xl border border-gray-200"
                aria-label="Zoom in"
              >
                +
              </button>
              <button
                onClick={handleZoomOut}
                disabled={zoomLevel <= 1}
                className="w-10 h-10 bg-white rounded-lg shadow-lg flex items-center justify-center hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-gray-700 font-bold text-xl border border-gray-200"
                aria-label="Zoom out"
              >
                −
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Popups */}
      {selectedLandmark && (
        <StoryPopup
          landmark={selectedLandmark}
          onClose={() => {
            setSelectedLandmark(null);
            setShowMoreStories(false);
          }}
          onMoreStories={() => setShowMoreStories(true)}
        />
      )}

      {showMoreStories && selectedLandmark && (
        <MoreStoriesPopup
          landmark={selectedLandmark}
          onClose={() => setShowMoreStories(false)}
        />
      )}
    </div>
  );
};

export default InteractiveMap;
