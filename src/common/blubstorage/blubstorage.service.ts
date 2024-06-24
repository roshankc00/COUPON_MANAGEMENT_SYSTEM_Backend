import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { BlobServiceClient } from '@azure/storage-blob';
import path, { join } from 'path';
import 'dotenv/config';
import * as fs from 'fs';
import { Multer } from 'multer';
@Injectable()
export class AzureBulbStorageService {
  private readonly connectionString =
    process.env.AZURE_STORAGE_CONNECTION_STRING;
  private readonly containerName = process.env.AZURE_CONTAINER_NAME;
  private readonly blobServiceClient = BlobServiceClient.fromConnectionString(
    this.connectionString,
  );
  private readonly containerClient = this.blobServiceClient.getContainerClient(
    this.containerName,
  );

  async uploadImage(file: Express.Multer.File) {
    try {
      const blobName = file.filename;
      console.log(file, file.fieldname);
      const blockBlobClient = this.containerClient.getBlockBlobClient(blobName);

      const stream = fs.createReadStream(file.path);
      const uploadOptions = {
        bufferSize: 4 * 1024 * 1024,
        maxBuffers: 20,
      };

      await blockBlobClient.uploadStream(
        stream,
        uploadOptions.bufferSize,
        uploadOptions.maxBuffers,
      );
      const imageUrl = blockBlobClient.url;
      await fs.promises.unlink(file.path);
      return {
        blobName,
        imageUrl,
      };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  async deleteImage(blubname: string) {
    try {
      const containerClient = this.blobServiceClient.getContainerClient(
        this.containerName,
      );
      const blockBlobClient = containerClient.getBlockBlobClient(blubname);

      await blockBlobClient.delete();
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }
}
