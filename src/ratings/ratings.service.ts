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
    const subscription = await this.subscriptionRepo.findOne({  
      where : {idSubscription: subscriptionId},
      relations: ['ratings'],
    });

    if (!subscription) {
      throw new NotFoundException(`Subscription with ID ${subscriptionId} not found`);
    }

    return subscription.ratings || [];
  }


  async getRating(idRating: number): Promise<RatingEntity> {
    const rating = await this.ratingRepo.findOne({
      where : {idRating: idRating}
    });

    if (!rating) {
      throw new NotFoundException(`Rating with ID ${idRating} not found`);
    }

    return rating;
  }

  
  async createRating(idSubscription: number, ratingDto: RatingDto): Promise<RatingEntity> {
    const subscription = await this.subscriptionRepo.findOne( {
      where : {idSubscription: idSubscription}
      });

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


  async updateRating(idRating: number, ratingDto: RatingDto): Promise<RatingEntity> {
    const rating = await this.ratingRepo.findOne({ 
      where : {idRating: idRating}
    });

    if (!rating) {
      throw new NotFoundException(`Rating with ID ${idRating} not found`);
    }

    rating.rating = ratingDto.rating;
    rating.reviewTest = ratingDto.reviewTest;

    return await this.ratingRepo.save(rating);
  }



  async deleteRating(idRating: number): Promise<void> {
    const rating = await this.ratingRepo.findOne({ 
      where : {idRating: idRating}
    });

    if (!rating) {
      throw new NotFoundException(`Rating with ID ${idRating} not found`);
    }

    await this.ratingRepo.remove(rating);
  }


  async getAllRatings(): Promise<RatingEntity[]> {
    return this.ratingRepo.find();
  }
}

