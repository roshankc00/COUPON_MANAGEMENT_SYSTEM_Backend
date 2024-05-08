import { createParamDecorator, BadRequestException } from '@nestjs/common';
import { extname } from 'path';

export const FileUpload = createParamDecorator(async (data, req) => {
  const file = req.file;
  if (!file) {
    throw new BadRequestException('File not uploaded');
  }

  const allowedExtensions = ['.png', '.jpg', 'jpeg'];
  const fileExt = extname(file.originalname);
  if (!allowedExtensions.includes(fileExt)) {
    throw new BadRequestException('Only PNG and JPG files are allowed');
  }

  return file;
});
