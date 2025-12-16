import { X, Play } from 'lucide-react';
import { Landmark } from '@/data/landmarks';

interface Props {
  landmark: Landmark;
  onClose: () => void;
}

const MoreStoriesPopup = ({ landmark, onClose }: Props) => {
  return (
    <>
      <div 
        className="fixed inset-0 bg-black/65 backdrop-blur-md z-[60] animate-in fade-in duration-300"
        onClick={onClose}
      />
      
      <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 pointer-events-none">
        <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[85vh] overflow-hidden pointer-events-auto animate-in fade-in slide-in-from-bottom-8 duration-300">
          
          {/* Header */}
          <div className="sticky top-0 z-10 bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 flex justify-between items-center shadow-lg">
            <div>
              <h2 className="text-2xl font-bold">More Stories</h2>
              <p className="text-blue-100 text-sm mt-1">{landmark.division} Division</p>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Story List */}
          <div className="overflow-y-auto max-h-[calc(85vh-120px)]">
            {landmark.moreStories.map((story, index) => (
              <div
                key={story.id}
                className="p-5 border-b border-gray-100 hover:bg-gradient-to-r hover:from-blue-50 hover:to-transparent transition-all flex items-center gap-4 animate-in fade-in slide-in-from-bottom"
                style={{
                  animationDelay: `${index * 50}ms`,
                  animationFillMode: 'both'
                }}
              >
                {/* Avatar */}
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center text-2xl font-bold text-blue-600 shadow-md flex-shrink-0">
                  {story.personName.charAt(0)}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 text-base leading-tight mb-1 truncate">
                    {story.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">{story.personName}</p>
                  
                  {/* Mini Player */}
                  <div className="flex items-center gap-3">
                    <button className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-md">
                      <Play className="w-5 h-5 ml-0.5" fill="currentColor" />
                    </button>
                    <div className="flex-1 h-1.5 bg-gray-200 rounded-full" />
                    <span className="text-xs text-gray-600 font-mono">2:30</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="sticky bottom-0 bg-gray-50 border-t p-4 text-center">
            <button
              onClick={onClose}
              className="text-sm text-gray-600 hover:text-gray-900 font-medium transition-colors"
            >
              ← Back to Main Story
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default MoreStoriesPopup;
