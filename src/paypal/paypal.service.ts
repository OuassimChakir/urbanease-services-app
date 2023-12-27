import * as paypal from 'paypal-rest-sdk';
import { PlanEntity } from '../migrations/plan.entity';

export class PaypalService {
  constructor() {
    paypal.configure({
      mode: 'sandbox', // Use 'live' for production
      client_id:
        'AdMuW4T5pZwkrqtKxvCnmam5IS9lcrGxvPWLBgrPckY0dSkKmtgUOkFKgcH9Pl0X1_vjA5mkZnkT8vDh',
      client_secret:
        'EHybZPwjUdeIQCSv0QHWCvygBVsXG7vmV_i9OOxN7oO3N6LZQUaMi8SLtbyO4hiQLxjne23i9Zl5Djuq',
    });
  }

  async createPayment(
    plan: PlanEntity,
    return_url?: string,
    cancel_url?: string,
  ): Promise<any> {
    const payment = {
      intent: 'sale',
      payer: {
        payment_method: 'paypal',
      },
      redirect_urls: {
        return_url: 'http://localhost:3000/' + return_url,
        cancel_url: 'http://localhost:3000/' + cancel_url,
      },
      transactions: [
        {
          item_list: {
            items: [
              {
                name: `${plan.planName}`,
                sku: `${plan.service.serviceName}`,
                price: plan.price,
                currency: 'SEK',
                quantity: 1,
              },
            ],
          },
          amount: {
            total: plan.price,
            currency: 'SEK',
          },
          description: `Achat de: Plan ID${plan.idPlan} (${plan.planName}) of Service (${plan.service.serviceName})`,
          custom: plan.idPlan,
        },
      ],
    };

    console.log('payment', payment);

    return new Promise((resolve, reject) => {
      paypal.payment.create(payment, (error, payment) => {
        if (error) {
          reject(error);
        } else {
          resolve(
            payment.links.find((link) => link.rel === 'approval_url').href,
          );
        }
      });
    });
  }

  async executePayment(paymentId: string, payerId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      paypal.payment.execute(
        paymentId,
        { payer_id: payerId },
        (error, payment) => {
          if (error) {
            reject(error);
          } else {
            resolve(payment);
          }
        },
      );
    });
  }
}
