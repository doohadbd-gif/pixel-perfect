import { MapPin } from 'lucide-react';
import { Landmark } from '@/data/landmarks';

interface Props {
  landmark: Landmark;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
  onClick: () => void;
}

const LandmarkPin = ({ landmark, isHovered, onHover, onLeave, onClick }: Props) => {
  return (
    <button
      className="absolute pointer-events-auto cursor-pointer group"
      style={{
        left: landmark.position.left,
        top: landmark.position.top,
        transform: 'translate(-50%, -50%)'
      }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onClick={onClick}
      aria-label={`View ${landmark.division} stories`}
    >
      {/* Pulse Ring */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div 
          className={`w-12 h-12 rounded-full border-2 animate-ping opacity-75 ${
            isHovered ? 'border-white' : 'border-blue-400'
          }`}
          style={{ animationDuration: '2s' }}
        />
      </div>

      {/* Pin Button */}
      <div className={`relative w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200 ${
        isHovered ? 'scale-125 shadow-2xl' : 'scale-100'
      }`}>
        <div 
          className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200"
          style={{ 
            backgroundColor: isHovered ? '#005BAA' : landmark.color,
            boxShadow: isHovered ? '0 0 20px rgba(0, 91, 170, 0.6)' : 'none'
          }}
        >
          <MapPin className="w-5 h-5 text-white" />
        </div>
      </div>

      {/* Label */}
      {isHovered && (
        <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 whitespace-nowrap animate-in fade-in zoom-in duration-200">
          <div className="bg-white px-3 py-1.5 rounded-lg shadow-xl text-sm font-bold text-gray-800">
            {landmark.division}
            <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white rotate-45" />
          </div>
        </div>
      )}
    </button>
  );
};

export default LandmarkPin;
