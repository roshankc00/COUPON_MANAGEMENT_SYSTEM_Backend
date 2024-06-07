import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreatePaymentSolutionDto } from './dto/create-payment-solution.dto';
import axios from 'axios';
import * as QRCode from 'qrcode';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class PaymentSolutionService {
  constructor(private readonly configService: ConfigService) {}
  async create(createPaymentSolutionDto: CreatePaymentSolutionDto) {
    const { amount, remark } = createPaymentSolutionDto;

    try {
      const loginResponse = await axios.post(
        'https://merchantapi.fonepay.com/authentication/login',
        {
          username: this.configService.getOrThrow('PHONE_PAY_USERNAME'),
          password: this.configService.getOrThrow('PHONE_PAY_PASSWORD'),
        },
      );

      const token = loginResponse?.data?.accessToken;

      if (!token) {
        throw new ForbiddenException('Failed to authenticate with Fonepay');
      }

      const response = await axios.post(
        'https://merchantapi.fonepay.com/merchantQr/receivePayment',
        {
          amount: amount,
          remark: remark,
          billId: this.configService.getOrThrow('PHONE_PAY_BILLID'),
          selectTerminal: this.configService.get('PHONE_PAY_TERMINALID'),
          terminalId: this.configService.getOrThrow('PHONE_PAY_TERMINALID'),
        },
        {
          headers: {
            Authorization: token,
          },
        },
      );

      const data = response?.data?.qrMessage;
      const buffer = await QRCode.toBuffer(data, { type: 'png' });
      return {
        qrCodeUrl: `data:image/png;base64,${buffer.toString('base64')}`,
      };
    } catch (error) {
      if (error.response && error.response.status === 403) {
        throw new ForbiddenException('Failed to authenticate with Fonepay');
      } else {
        throw error;
      }
    }
  }
}
