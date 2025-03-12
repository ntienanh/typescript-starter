import { v2 as cloudinary } from 'cloudinary';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

@Injectable()
export class CloudinaryService {
  constructor(private configService: ConfigService) {
    cloudinary.config({
      cloud_name: this.configService.get<string>('CLOUDINARY_CLOUD_NAME'),
      api_key: this.configService.get<string>('CLOUDINARY_API_KEY'),
      api_secret: this.configService.get<string>('CLOUDINARY_API_SECRET'),
    });
  }

  async uploadImage(file: Express.Multer.File): Promise<string> {
    return new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream((error, result) => {
          if (error) reject(error);
          resolve(result.secure_url);
        })
        .end(file.buffer);
    });
  }
}

export const CloudinaryMulterConfig = {
  storage: new CloudinaryStorage({
    cloudinary,
    params: {
      folder: 'food_images', // Thư mục lưu ảnh
      format: async () => 'png', // Định dạng ảnh
      public_id: (req, file) => file.originalname.split('.')[0], // Tên file
    } as unknown as { folder: string }, // ⚠️ Ép kiểu để tránh lỗi
  }),
};
