export interface TPresignUrlResponse {
  pregignedUrl: string;
  id: string;
}

export interface TPresignUrlRequest {
  name: string;
  size: number;
  extension: string;
  mimetype: string;
}

export interface TGetUrlResponse {
  id: string;
  url: string;
}
