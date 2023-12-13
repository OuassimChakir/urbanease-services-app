import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentEntity } from '../migrations/payment.entity';
import { Repository } from 'typeorm';
import { UserEntity } from '../migrations/user.entity';
import { SubscriptionEntity } from '../migrations/subscription.entity';
import { NewSubscriptionInvoiceDto } from './dto/NewSubscriptionInvoice.dto';
import { ClientPaymentDto } from './dto/ClientPayment.dto';
import { PayServiceProviderDto } from './dto/PayServiceProvider.dto';
import { PaymentStatusEnum } from './payment-status.enum';
import { format } from 'date-fns';
import { ServiceProviderEntity } from '../migrations/service-provider.entity';

@Injectable()
export class PaymentTransactionsService {
  constructor(
    @InjectRepository(PaymentEntity)
    private paymentRepo: Repository<PaymentEntity>,
    @InjectRepository(UserEntity)
    private userRepo: Repository<UserEntity>,
    @InjectRepository(PaymentEntity)
    private subscriptionRepo: Repository<SubscriptionEntity>,
  ) {}

  async generateSubscriptionInvoice(
    newSubscriptionInvoiceDto: NewSubscriptionInvoiceDto,
  ) {
    const { description, amount, transactionType, idUser, idSubscription } =
      newSubscriptionInvoiceDto;
    const user = await this.userRepo.findOneBy({ idUser: idUser });
    if (!user) {
      throw new NotFoundException(`User ID: ${idUser} Not Found`);
    }
    const subscription = await this.subscriptionRepo.findOneBy({
      idSubscription: idSubscription,
    });
    if (!subscription) {
      throw new NotFoundException(
        `Subscription ID: ${idSubscription} Not Found!`,
      );
    }

    const invoice: PaymentEntity = this.paymentRepo.create({
      amount,
      transactionType,
      user,
      description,
      subscription,
    });

    return await this.paymentRepo.save(invoice);
  }

  async clientPayment(
    idPayment: number,
    clientPaymentDto: ClientPaymentDto,
  ): Promise<PaymentEntity> {
    const { paymentDate, paymentMethod, status } = clientPaymentDto;

    const invoice = await this.paymentRepo.findOneBy({ idPayment: idPayment });
    if (!invoice) {
      throw new NotFoundException(`Payment Invoice ID ${idPayment} Not Found!`);
    }
    invoice.paymentDate = paymentDate;
    invoice.paymentMethod = paymentMethod;
    invoice.status = status;

    return this.paymentRepo.save(invoice);
  }

  async generateServiceProviderPayment(
    payServiceProvider: PayServiceProviderDto,
  ) {
    const { description, amount, transactionType, idUser } = payServiceProvider;
    const user = await this.userRepo.findOneBy({ idUser: idUser });
    if (!user) {
      throw new NotFoundException(`User ID: ${idUser} Not Found`);
    }

    const invoice: PaymentEntity = this.paymentRepo.create({
      amount,
      transactionType,
      user,
      description,
    });

    return await this.paymentRepo.save(invoice);
  }

  async approveServiceProviderPayment(idPayment: number) {
    const payment = await this.paymentRepo.findOneBy({ idPayment: idPayment });
    if (!payment) {
      throw new NotFoundException(`Payment ID ${idPayment} Not Found`);
    }
    payment.status = PaymentStatusEnum.PAID;
    const currentDate = new Date();
    const formattedDateTime = format(currentDate, 'yyyy-MM-dd HH:mm:ss');
    payment.paymentDate = formattedDateTime;
    payment.updated_at = formattedDateTime;

    return await this.paymentRepo.save(payment);
  }

  async getServiceProviderPayments(
    serviceProvider: ServiceProviderEntity,
  ): Promise<PaymentEntity[]> {
    return await this.paymentRepo.find({
      where: { user: { idUser: serviceProvider.user.idUser } },
    });
  }

  async getUnpaidServiceProviderPayments(
    serviceProvider: ServiceProviderEntity,
  ): Promise<PaymentEntity[]> {
    return await this.paymentRepo.find({
      where: {
        status: PaymentStatusEnum.UNPAID,
        user: { idUser: serviceProvider.user.idUser },
      },
    });
  }

  async getAllUnpaidServiceProvidersPayments(): Promise<PaymentEntity[]> {
    return await this.paymentRepo.find({
      where: {
        status: PaymentStatusEnum.UNPAID,
      },
    });
  }
}
