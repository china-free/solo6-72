import { useRef } from 'react';
import { Upload, X, Image as ImageIcon, Trash2 } from 'lucide-react';
import { useGameStore } from '@/store/gameStore';

interface ImageUploaderProps {
  compact?: boolean;
}

export function ImageUploader({ compact = false }: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const customImages = useGameStore((state) => state.customImages);
  const addCustomImage = useGameStore((state) => state.addCustomImage);
  const removeCustomImage = useGameStore((state) => state.removeCustomImage);
  const clearCustomImages = useGameStore((state) => state.clearCustomImages);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    Array.from(files).forEach((file) => {
      if (!file.type.startsWith('image/')) return;

      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const maxSize = 200;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > maxSize) {
              height = Math.round((height * maxSize) / width);
              width = maxSize;
            }
          } else {
            if (height > maxSize) {
              width = Math.round((width * maxSize) / height);
              height = maxSize;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(img, 0, 0, width, height);
            const resizedData = canvas.toDataURL('image/jpeg', 0.8);
            addCustomImage(resizedData);
          }
        };
        img.src = event.target?.result as string;
      };
      reader.readAsDataURL(file);
    });

    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  if (compact) {
    return (
      <div className="flex items-center gap-2 flex-wrap">
        {customImages.slice(0, 5).map((img, i) => (
          <div key={i} className="relative w-12 h-12 rounded-lg overflow-hidden border-2 border-dark-600">
            <img src={img} alt="" className="w-full h-full object-cover" />
          </div>
        ))}
        {customImages.length > 5 && (
          <div className="w-12 h-12 rounded-lg border-2 border-dark-600 flex items-center justify-center text-gray-500 text-sm">
            +{customImages.length - 5}
          </div>
        )}
        <button
          onClick={() => inputRef.current?.click()}
          className="w-12 h-12 rounded-lg border-2 border-dashed border-dark-600 flex items-center justify-center hover:border-neon-cyan transition-colors"
        >
          <Upload className="w-5 h-5 text-gray-500" />
        </button>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={handleFileSelect}
        />
      </div>
    );
  }

  return (
    <div className="w-full p-4 rounded-xl border-2 border-dashed border-dark-600 bg-dark-800/50">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-display font-bold text-neon-purple flex items-center gap-2">
          <ImageIcon className="w-5 h-5" />
          自定义图片 ({customImages.length}/32)
        </h3>
        {customImages.length > 0 && (
          <button
            onClick={clearCustomImages}
            className="flex items-center gap-1 px-3 py-1 rounded-lg border border-neon-red/30 text-neon-red text-sm hover:bg-neon-red/10 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            清空
          </button>
        )}
      </div>

      <div
        onClick={() => inputRef.current?.click()}
        className="cursor-pointer p-8 rounded-xl border-2 border-dashed border-dark-600 hover:border-neon-purple hover:bg-neon-purple/5 transition-all duration-300 flex flex-col items-center justify-center gap-3 mb-4"
      >
        <Upload className="w-10 h-10 text-gray-500" />
        <div className="text-center">
          <p className="font-display font-bold text-gray-300">点击上传图片</p>
          <p className="text-sm text-gray-500 mt-1">支持多选，至少需要 8 张图片</p>
        </div>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={handleFileSelect}
      />

      {customImages.length > 0 && (
        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
          {customImages.map((img, i) => (
            <div key={i} className="relative aspect-square rounded-lg overflow-hidden border-2 border-dark-600 group">
              <img src={img} alt="" className="w-full h-full object-cover" />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeCustomImage(i);
                }}
                className="absolute top-1 right-1 p-1 rounded-full bg-neon-red/80 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-3 h-3 text-white" />
              </button>
            </div>
          ))}
        </div>
      )}

      {customImages.length > 0 && customImages.length < 8 && (
        <p className="mt-3 text-sm text-neon-yellow">
          ⚠️ 还需要上传至少 {8 - customImages.length} 张图片才能开始游戏
        </p>
      )}
    </div>
  );
}
