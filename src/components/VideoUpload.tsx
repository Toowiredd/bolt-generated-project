import React, { useState } from 'react';
import { Upload, AlertCircle } from 'lucide-react';
import { uploadVideo } from '../utils/videoUpload';
import type { UploadResponse } from '../types';

interface VideoUploadProps {
  onUploadComplete: (response: UploadResponse) => void;
}

export function VideoUpload({ onUploadComplete }: VideoUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);
    setProgress(0);

    try {
      const response = await uploadVideo(file, (progress) => {
        setProgress(progress);
      });

      if (response.success) {
        onUploadComplete(response);
      } else {
        setError(response.error || 'Upload failed');
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="relative border-2 border-dashed border-amber-500 rounded-lg p-8 text-center">
        <input
          type="file"
          accept="video/mp4,video/quicktime,video/x-msvideo,video/webm"
          onChange={handleFileChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          disabled={uploading}
        />
        
        <Upload className="mx-auto w-12 h-12 text-amber-500 mb-4" />
        <h3 className="text-lg font-semibold mb-2">Upload Video</h3>
        <p className="text-sm text-gray-400 mb-4">
          MP4, MOV, AVI, or WebM (max 100MB)
        </p>

        {uploading && (
          <div className="mt-4">
            <div className="w-full bg-gray-800 rounded-full h-2 mb-2">
              <div 
                className="bg-amber-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-sm text-amber-500">Uploading... {progress}%</p>
          </div>
        )}

        {error && (
          <div className="mt-4 text-red-500 flex items-center justify-center">
            <AlertCircle className="w-4 h-4 mr-2" />
            <span className="text-sm">{error}</span>
          </div>
        )}
      </div>
    </div>
  );
}
