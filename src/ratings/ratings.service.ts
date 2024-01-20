import { Injectable, NotFoundException } from '@nestjs/common';
import { FindManyOptions, Repository } from 'typeorm';
import { RatingEntity } from '../migrations/rating.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { RatingDto } from './dto/rating.dto';
import { ClientEntity } from '../migrations/client.entity';
import { ServiceProviderEntity } from '../migrations/service-provider.entity';
import { JobEntity } from '../migrations/job.entity';

@Injectable()
export class RatingService {
  constructor(
    @InjectRepository(RatingEntity)
    private ratingRepo: Repository<RatingEntity>,
    @InjectRepository(ClientEntity)
    private clientEntity: Repository<ClientEntity>,
    @InjectRepository(ServiceProviderEntity)
    private serviceProviderEntityRepo: Repository<ServiceProviderEntity>,
    @InjectRepository(JobEntity)
    private jobEntityRepo: Repository<JobEntity>,
  ) {}

  async getRatings(): Promise<RatingEntity[]> {
    const ratings = await this.ratingRepo.find({
      relations: ['client', 'team', 'serviceProvider'],
    });

    if (!ratings) {
      throw new NotFoundException(`No Rating has been found`);
    }

    return ratings;
  }

  async getRating(idRating: number): Promise<RatingEntity> {
    const rating = await this.ratingRepo.findOne({
      where: { idRating: idRating },
      relations: ['client', 'team', 'serviceProvider'],
    });

    if (!rating) {
      throw new NotFoundException(`Rating with ID ${idRating} not found`);
    }

    return rating;
  }

  async createRating(
    idJob: number,
    ratingDto: RatingDto,
  ): Promise<RatingEntity> {
    const { rating, reviewText, reviewDate, idClient, idServiceProvider } =
      ratingDto;
    const client = await this.clientEntity.findOneBy({ idClient: idClient });
    if (!client) {
      throw new NotFoundException(`Client with ID ${idClient} not found`);
    }

    const serviceProvider = await this.serviceProviderEntityRepo.findOneBy({
      idServiceProvider: idServiceProvider,
    });
    if (!serviceProvider) {
      throw new NotFoundException(
        `Service Provider with ID ${idServiceProvider} not found`,
      );
    }

    const job = await this.jobEntityRepo.findOneBy({
      idJob: idJob,
    });
    if (!job) {
      throw new NotFoundException(`Job with ID ${idJob} not found`);
    }

    const ratingEntity: RatingEntity = this.ratingRepo.create({
      rating: rating,
      reviewTest: reviewText,
      reviewDate: reviewDate,
      client: client,
      job: job,
      serviceProvider: serviceProvider,
    });

    const savedRating = await this.ratingRepo.save(ratingEntity);
    return savedRating;
  }

  async updateRating(
    idRating: number,
    ratingDto: RatingDto,
  ): Promise<RatingEntity> {
    const rating = await this.ratingRepo.findOne({
      where: { idRating: idRating },
    });

    if (!rating) {
      throw new NotFoundException(`Rating with ID ${idRating} not found`);
    }

    rating.rating = ratingDto.rating;
    rating.reviewTest = ratingDto.reviewText;

    return await this.ratingRepo.save(rating);
  }

  async deleteRating(idRating: number): Promise<void> {
    const rating = await this.ratingRepo.findOne({
      where: { idRating: idRating },
    });

    if (!rating) {
      throw new NotFoundException(`Rating with ID ${idRating} not found`);
    }

    await this.ratingRepo.remove(rating);
  }

  async getServiceProviderRating(
    idServiceProvider: number,
  ): Promise<ServiceProviderEntity> {
    try {
      const serviceProvider: ServiceProviderEntity =
        await this.serviceProviderEntityRepo.findOne({
          where: { idServiceProvider: idServiceProvider },
          relations: ['ratings'],
        });

      if (!serviceProvider || serviceProvider.ratings.length === 0) {
        throw new NotFoundException(
          'No ratings found for the service provider',
        );
      }

      return serviceProvider;
    } catch (error) {
      throw new NotFoundException(error);
    }
  }
}
