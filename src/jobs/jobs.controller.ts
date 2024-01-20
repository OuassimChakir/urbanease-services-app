import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  Redirect,
} from '@nestjs/common';
import { JobsService } from './jobs.service';
import { CreateJobDto } from './dto/CreateJob.dto';
import { TeamsService } from '../teams/teams.service';
import { JobEntity } from '../migrations/job.entity';
import { UpdateJobDto } from './dto/UpdateJob.dto';
import { UpdateJobStatusDto } from './dto/updateJobStatus.dto';
import { TeamEntity } from '../migrations/team.entity';
import { CreatePlanJobDto } from './dto/CreatePlanJob.dto';
import { SubscriptionsService } from '../subscriptions/subscriptions.service';
import { PaypalService } from '../paypal/paypal.service';
import { PlanEntity } from '../migrations/plan.entity';
import { PricingPlansService } from '../pricing-plans/pricing-plans.service';
import { SubscriptionEntity } from '../migrations/subscription.entity';
import { PaymentMethodEnum } from '../payment-transactions/payment-method.enum';
import { TransacationTypeEnum } from '../payment-transactions/transacationType.enum';
import { PaymentStatusEnum } from '../payment-transactions/payment-status.enum';
import { ClientsService } from '../clients/clients.service';
import { UserService } from '../user/user.service';
import { PaymentTransactionsService } from '../payment-transactions/payment-transactions.service';
import { PlanTypeEnum } from '../pricing-plans/PlanType.enum';
import { PaymentEntity } from '../migrations/payment.entity';
import { EndPlanJobDto } from './dto/endPlanJob.dto';

@Controller('jobs')
export class JobsController {
  constructor(
    private jobService: JobsService,
    private teamService: TeamsService,
    private subscriptionService: SubscriptionsService,
    private paypalService: PaypalService,
    private planService: PricingPlansService,
    private clientService: ClientsService,
    private userService: UserService,
    private paymentService: PaymentTransactionsService,
  ) {}

  @Get('/')
  getJobs(): Promise<JobEntity[]> {
    return this.jobService.getJobs();
  }

  @Get(':idJob')
  getJob(@Param('idJob') idJob: number): Promise<JobEntity> {
    return this.jobService.getJob(idJob);
  }

  @Post('/new')
  @Redirect()
  async createJob(@Body() createJobDto: CreateJobDto, @Headers() headers: any) {
    const { serviceProviderIds, idPlan } = createJobDto;
    const plan: PlanEntity = await this.planService.getPricingPlan(idPlan);
    const team: TeamEntity =
      await this.teamService.createTeam(serviceProviderIds);
    createJobDto.price = plan.price;
    const success_url = 'jobs/payment/verify';
    const cancel_url = 'jobs/payment/verify';
    if (plan.planType == PlanTypeEnum.ONE_SESSION) {
      const paymentUrl = await this.paypalService.createPayment(
        plan,
        success_url,
        cancel_url,
      );
      headers['job-data'] = JSON.stringify({
        createJobDto,
        team,
      });
      return { url: paymentUrl };
    } else {
      throw new NotFoundException('One Time plan or Plan Not Found!');
    }
  }

  @Get('/payment/verify')
  async validateJobPayment(
    @Query('paymentId') paymentId: string,
    @Query('PayerID') payerId: string,
    @Headers('job-data') jobData: any,
  ) {
    jobData = JSON.parse(jobData);
    const idUser = 2;
    const client = await this.clientService.getClientByUser(idUser);
    const user = await this.userService.getUser(idUser);
    try {
      const result = await this.paypalService.executePayment(
        paymentId,
        payerId,
      );
      const plan: PlanEntity = await this.planService.getPricingPlan(
        result.transactions[0].custom,
      );

      const subscription: SubscriptionEntity =
        await this.subscriptionService.newOneSubscription(client, plan);
      const payment: PaymentEntity =
        await this.paymentService.initialSubscription(
          result.transactions[0].amount.total,
          result.create_time,
          PaymentMethodEnum.PAYPAL,
          TransacationTypeEnum.INCOMING,
          result.transactions[0].description,
          PaymentStatusEnum.PAID,
          result.id,
          result.payer.payer_info.payer_id,
          user,
          subscription,
        );
      const job: JobEntity = await this.jobService.createJob(
        jobData.createJobDto,
        jobData.team,
      );

      return { success: true, payment, job };
    } catch (error) {
      console.error('error executing paypal payment:', error);
      return { success: false, error: error.message };
    }
  }

  @Post('/planjob/new')
  createPlanJob(@Body() createPlanJobDto: CreatePlanJobDto) {
    const { serviceProviderIds, idSubscription } = createPlanJobDto;

    // Check Subscription
    const subscription =
      this.subscriptionService.getSubscriptionById(idSubscription);
    return subscription
      .then((subscriptionEntity: SubscriptionEntity) => {
        const team: Promise<TeamEntity> =
          this.teamService.createTeam(serviceProviderIds);
        return team
          .then(async (teamEntity) => {
            await this.subscriptionService.updateSubscriptionCredit(
              subscriptionEntity,
              subscriptionEntity.credit - 1,
            );
            return await this.jobService.createPlanJob(
              createPlanJobDto,
              teamEntity,
            );
          })
          .catch((error) => {
            throw new InternalServerErrorException(error);
          });
      })
      .catch((error): void => {
        throw new NotFoundException(error);
      });
  }

  @Patch('/planjob/end')
  endPlanJob(@Body() endPlanJobDto: EndPlanJobDto): Promise<JobEntity> {
    return this.jobService.endJob(endPlanJobDto);
  }

  @Delete(':idJob/delete')
  async deleteJob(@Param('idJob') idJob: number) {
    const job = await this.jobService.getJob(idJob);
    if (!job) {
      throw new NotFoundException(`Job ID ${idJob} Not Found!`);
    }
    const idTeam = job.team.idTeam;
    await this.jobService.deleteJob(idJob);
    await this.teamService.destroyTeam(idTeam);
    return 'Job has been deleted successfully!';
  }

  @Patch(':idJob/update')
  updateJob(
    @Body() updateJobDto: UpdateJobDto,
    @Param('idJob') idJob: number,
  ): Promise<JobEntity> {
    return this.jobService.updateJob(updateJobDto, idJob);
  }

  @Patch('/status/update')
  updateJobStatus(
    @Body() updateJobStatusDto: UpdateJobStatusDto,
  ): Promise<JobEntity> {
    return this.jobService.updateJobStatus(updateJobStatusDto);
  }

  @Post(':idJob/team/update')
  async updateJobTeam(
    @Param('idJob') idJob: number,
    @Body('serviceProvidersIds') serviceProvidersIds: number[],
  ): Promise<JobEntity> {
    // Creating a Team
    const team: TeamEntity =
      await this.teamService.createTeam(serviceProvidersIds);
    const idPreviousTeam: number = (await this.jobService.getJob(idJob)).team
      .idTeam;

    // Updating the Job Team
    const updatedJob: JobEntity = await this.jobService.updateJobTeam(
      idJob,
      team,
    );

    // Deleting the previous Team
    await this.teamService.destroyTeam(idPreviousTeam);

    return updatedJob;
  }
}
