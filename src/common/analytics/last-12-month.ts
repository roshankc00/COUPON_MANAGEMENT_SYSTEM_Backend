import { Between, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

export interface MonthData {
  month: string;
  count: number;
}

@Injectable()
export class GenerateAnalytics<T> {
  async getLast12MonthData(
    repository: Repository<T>,
  ): Promise<{ last12Months: MonthData[] }> {
    const last12Months: MonthData[] = [];
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 1);

    for (let i = 11; i >= 0; i--) {
      const endDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate() - i * 28,
      );

      const startDate = new Date(
        endDate.getFullYear(),
        endDate.getMonth(),
        endDate.getDate() - 28,
      );

      const monthYear = endDate.toLocaleString('default', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      });

      const count = await repository
        .createQueryBuilder('q')
        .where(
          `q.createdAt BETWEEN '${startDate.toISOString()}' AND '${endDate.toISOString()}'`,
        )
        .getCount();

      last12Months.push({ month: monthYear, count });
    }
    return { last12Months };
  }
}
