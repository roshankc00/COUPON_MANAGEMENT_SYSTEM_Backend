import { Module } from '@nestjs/common';
import { AzureBulbStorageService } from './blubstorage.service';

@Module({
  providers: [AzureBulbStorageService],
  exports: [AzureBulbStorageService],
})
export class AzureBulbStorageModule {}
