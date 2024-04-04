import { UploadApiErrorResponse, UploadApiResponse } from 'cloudinary';

export type CloudinaryResponse = UploadApiResponse | UploadApiErrorResponse;

export type CloudUploadOptions = {
    folder: string;
    allowed_formats: string[];
    max_bytes: number;
};
