import { Controller, Get, Param, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { readFileSync } from 'fs';
import { join } from 'path';

@Controller()
export class AppController {
  @Get('images/:imagename')
  async getImage(@Res() res: Response, @Param('imagename') imagename: string) {
    try {
      const imagePath = join(__dirname, '..', '../images', imagename); // Adjust the path
      const imageData = readFileSync(imagePath);
      res
        .status(HttpStatus.OK)
        .set('Content-Type', 'image/jpeg')
        .send(imageData);
    } catch (error) {
      console.log(error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send('Error fetching image');
    }
  }
}
