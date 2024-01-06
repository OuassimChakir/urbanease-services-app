// rating.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { RatingEntity } from '../migrations/rating.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { RatingDto } from './dto/rating.dto';
import { SubscriptionEntity } from '../migrations/subscription.entity';

@Injectable()
export class RatingService {
  constructor(
    @InjectRepository(RatingEntity)
    private ratingRepo: Repository<RatingEntity>,
    @InjectRepository(SubscriptionEntity)
    private subscriptionRepo: Repository<SubscriptionEntity>,
  ) {}

  async getRatings(subscriptionId: number): Promise<RatingEntity[]> {
    return this.ratingRepo.find({ where: { subscription: { id: subscriptionId } } });
  }

  async getRating(idRating: number): Promise<RatingEntity> {
    return this.ratingRepo.findOne(idRating);
  }    

  async createRating(idSubscription: number, ratingDto: RatingDto): Promise<RatingEntity> {
    const subscription = await this.subscriptionRepo.findOne(idSubscription);

    if (!subscription) {      
      throw new NotFoundException(`Subscription with ID ${idSubscription} not found`);
    }

    const rating = this.ratingRepo.create({
      rating: ratingDto.rating,
      reviewTest: ratingDto.reviewTest, 
      reviewDate: new Date(),
      subscription,
    });

    const savedRating = await this.ratingRepo.save(rating);

    subscription.ratings.push(savedRating);
    await this.subscriptionRepo.save(subscription);

    return savedRating;
  }
}
