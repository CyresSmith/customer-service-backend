import { BadRequestException, Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import * as streamifier from 'streamifier';
import { CloudUploadOptions, CloudinaryResponse } from './cloudinary.types';

@Injectable()
export class CloudinaryService {
  async uploadFile(
    options: CloudUploadOptions,
    file: Express.Multer.File
  ): Promise<CloudinaryResponse> {
    try {
      return await new Promise<CloudinaryResponse>((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          options,
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          }
        );

        streamifier.createReadStream(file.buffer).pipe(uploadStream);
      });
    } catch (error) {
      throw new BadRequestException('Image load error');
    }
  }
}
