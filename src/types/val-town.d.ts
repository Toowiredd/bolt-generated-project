declare module 'https://esm.town/v/std' {
  interface BlobStorage {
    get(key: string): Promise<string | null>;
    set(key: string, value: string): Promise<void>;
    delete(key: string): Promise<void>;
  }

  interface JSONResponse {
    (data: any, init?: ResponseInit): Response;
  }

  export const blob: BlobStorage;
  export const json: JSONResponse;
}

declare module 'https://esm.town/v/std/blob' {
  export * from 'https://esm.town/v/std';
}

declare global {
  interface ResponseInit {
    status?: number;
    statusText?: string;
    headers?: Record<string, string>;
  }

  interface Request {
    url: string;
    method: string;
    headers: Headers;
    json(): Promise<any>;
  }

  interface Response {
    json(): Promise<any>;
  }

  class Headers {
    append(name: string, value: string): void;
    delete(name: string): void;
    get(name: string): string | null;
    has(name: string): boolean;
    set(name: string, value: string): void;
    forEach(callback: (value: string, name: string) => void): void;
  }
}
