import { UploadResponse, VideoUploadConfig } from '../types';

const VIDEO_UPLOAD_CONFIG: VideoUploadConfig = {
  maxSizeBytes: 100 * 1024 * 1024, // 100MB
  allowedTypes: ['video/mp4', 'video/quicktime', 'video/x-msvideo', 'video/webm'],
  uploadEndpoint: 'https://api.val.town/v1/run/@yourusername.uploadVideo'
};

export async function uploadVideo(
  file: File,
  onProgress?: (progress: number) => void
): Promise<UploadResponse> {
  // Validate file size
  if (file.size > VIDEO_UPLOAD_CONFIG.maxSizeBytes) {
    return {
      success: false,
      error: 'File size exceeds 100MB limit',
      status: 'failed'
    };
  }

  // Validate file type
  if (!VIDEO_UPLOAD_CONFIG.allowedTypes.includes(file.type)) {
    return {
      success: false,
      error: 'Unsupported file format. Please use MP4, MOV, AVI, or WebM',
      status: 'failed'
    };
  }

  try {
    const formData = new FormData();
    formData.append('video', file);

    const response = await fetch(VIDEO_UPLOAD_CONFIG.uploadEndpoint, {
      method: 'POST',
      body: formData,
      headers: {
        'Authorization': `Bearer ${process.env.VITE_VAL_TOWN_API_KEY}`
      }
    });

    if (!response.ok) {
      throw new Error('Upload failed');
    }

    const data = await response.json();
    
    return {
      success: true,
      url: data.url,
      status: 'completed'
    };
  } catch (error) {
    console.error('Video upload error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Upload failed',
      status: 'failed'
    };
  }
}
