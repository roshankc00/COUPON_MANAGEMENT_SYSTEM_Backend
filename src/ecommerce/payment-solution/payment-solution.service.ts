import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
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

      if (response?.data?.qrMessage && response?.data?.websocketId) {
        const data = response?.data?.qrMessage;
        const buffer = await QRCode.toBuffer(data, { type: 'png' });
        return {
          qrCodeUrl: `data:image/png;base64,${buffer.toString('base64')}`,
          websocketId: response?.data?.websocketId,
        };
      } else {
        return new BadRequestException();
      }
    } catch (error) {
      if (error.response && error.response.status === 403) {
        throw new ForbiddenException('Failed to authenticate with Fonepay');
      } else {
        throw error;
      }
    }
  }

  async test() {
    const loginResponse = await axios.post(
      'https://merchantapi.fonepay.com/authentication/login',
      {
        username: this.configService.getOrThrow('PHONE_PAY_USERNAME'),
        password: this.configService.getOrThrow('PHONE_PAY_PASSWORD'),
      },
    );

    const token = loginResponse?.data?.accessToken;
    const paymentId = 252127469;
    try {
      const response = await axios.get(
        `https://merchantapi.fonepay.com/transactions/252127469`,
        {
          headers: {
            Authorization: token,
          },
        },
      );
      return response?.data;
    } catch (error) {
      console.log(error);
    }

    // https://merchantapi.fonepay.com/report/merchant-Settlement-report?pageNumber=1&pageSize=25&fromTransmissionDateTime=2024-06-07&toTransmissionDateTime=2024-06-07
  }
}
