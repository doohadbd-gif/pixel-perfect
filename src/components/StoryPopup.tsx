import { useState, useRef, useEffect } from 'react';
import { X, Play, Pause, Volume2, BookOpen, ExternalLink } from 'lucide-react';
import { Landmark } from '@/data/landmarks';

interface Props {
  landmark: Landmark;
  onClose: () => void;
  onMoreStories: () => void;
}

const StoryPopup = ({ landmark, onClose, onMoreStories }: Props) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio(landmark.audioFile);
    
    audioRef.current.addEventListener('loadedmetadata', () => {
      setDuration(audioRef.current!.duration);
    });
    
    audioRef.current.addEventListener('timeupdate', () => {
      setCurrentTime(audioRef.current!.currentTime);
    });
    
    audioRef.current.addEventListener('ended', () => {
      setIsPlaying(false);
    });

    return () => {
      audioRef.current?.pause();
      audioRef.current = null;
    };
  }, [landmark.audioFile]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const vol = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.volume = vol;
      setVolume(vol);
    }
  };

  const formatTime = (time: number) => {
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 animate-in fade-in duration-300"
        onClick={onClose}
      />
      
      {/* Popup */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 pointer-events-auto animate-in fade-in zoom-in slide-in-from-bottom-4 duration-300">
          
          {/* Animated Background */}
          <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
            <div 
              className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-blue-400/10 to-cyan-500/5 animate-gradient-xy"
            />
          </div>

          {/* Content */}
          <div className="relative z-10">
            
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute -top-6 -right-6 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors border-2 border-gray-100"
            >
              <X className="w-6 h-6 text-gray-600" />
            </button>

            {/* Division Badge */}
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-full">
                <div 
                  className="w-3 h-3 rounded-full animate-pulse"
                  style={{ backgroundColor: landmark.color }}
                />
                <span className="text-sm font-semibold text-blue-900">
                  {landmark.division} Division
                </span>
              </div>
            </div>

            {/* Person Info */}
            <div className="text-center mb-6">
              <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center text-4xl font-bold text-blue-600 shadow-lg">
                {landmark.personName.charAt(0)}
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">
                {landmark.personName}
              </h3>
              <p className="text-sm text-gray-600">
                {landmark.personTitle}
              </p>
            </div>

            {/* Audio Player */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 mb-6 shadow-inner">
              <div className="flex items-center gap-4 mb-4">
                
                {/* Play/Pause */}
                <button
                  onClick={togglePlay}
                  className="w-14 h-14 flex items-center justify-center bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-full shadow-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 hover:scale-105 active:scale-95"
                >
                  {isPlaying ? (
                    <Pause className="w-7 h-7" fill="currentColor" />
                  ) : (
                    <Play className="w-7 h-7 ml-1" fill="currentColor" />
                  )}
                </button>

                {/* Progress */}
                <div className="flex-1">
                  <input
                    type="range"
                    min="0"
                    max={duration || 100}
                    value={currentTime}
                    onChange={handleSeek}
                    className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-600 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-lg"
                  />
                  <div className="flex justify-between text-xs text-gray-600 mt-2 font-mono">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                  </div>
                </div>
              </div>

              {/* Volume */}
              <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
                <Volume2 className="w-5 h-5 text-gray-600" />
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="flex-1 h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-600"
                />
                <span className="text-xs text-gray-600 font-mono w-8 text-right">
                  {Math.round(volume * 100)}%
                </span>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                onClick={onMoreStories}
                className="flex-1 px-6 py-4 border-2 border-blue-600 text-blue-600 rounded-xl font-semibold hover:bg-blue-50 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
              >
                <BookOpen className="w-5 h-5" />
                <span>More Stories</span>
              </button>
              
              <button
                onClick={() => window.open('https://www.bankasia-bd.com', '_blank')}
                className="flex-1 px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-lg"
              >
                <span>Visit</span>
                <ExternalLink className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StoryPopup;
