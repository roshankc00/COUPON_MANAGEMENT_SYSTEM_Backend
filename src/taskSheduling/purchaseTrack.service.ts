import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { AffiliateLinkService } from '../affiliate-link/affiliate-link.service';
import { PurchaseService } from '../purchase/purchase.service';
import { AffiliateLink } from 'src/affiliate-link/entities/affiliate-link.entity';
import { Cron } from '@nestjs/schedule';
@Injectable()
export class PurchaseServiceShedule {
  constructor(
    private readonly affiliateLinkService: AffiliateLinkService,
    private readonly purchaseService: PurchaseService,
  ) {}
  @Cron('0 0 * * *')
  async create() {
    const affiliatedLinks = await this.affiliateLinkService.findAll();
    const promises = [];
    for (const affiliateLink of affiliatedLinks) {
      const promise = this.processAffiliateLink(affiliateLink);
      promises.push(promise);
    }
    await Promise.allSettled(promises);
  }

  private async processAffiliateLink(affiliateLink: AffiliateLink) {
    try {
      const apiUrl = affiliateLink.link;
      const response = await axios.get(apiUrl, {
        headers: {
          Authorization: `Bearer ${this.affiliateLinkService.decrypt(affiliateLink.apiKey)}`,
        },
      });

      const transactions = response.data;
      const promises = [];

      for (const transaction of transactions) {
        const promise = this.purchaseService.create(transaction);
        promises.push(promise);
      }

      await Promise.allSettled(promises);
    } catch (error) {
      console.error(
        `Error processing affiliate link ${affiliateLink.link}: ${error.message}`,
      );
    }
  }
}
