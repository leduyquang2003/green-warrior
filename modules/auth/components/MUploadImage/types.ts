export interface ICroppedImage {
  url: string;
  name: string;
  size: number;
  extension: string;
  mimetype: string;
  file?: File;
}
