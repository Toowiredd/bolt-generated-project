export interface Video {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  videoUrl: string;
  duration: string;
  category: string;
  tags: string[];
  createdAt: string;
  views: number;
}

export interface UploadResponse {
  success: boolean;
  url?: string;
  error?: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
}

export interface VideoUploadConfig {
  maxSizeBytes: number;
  allowedTypes: string[];
  uploadEndpoint: string;
}
