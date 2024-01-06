import { Controller, Param, Post, Body, Get } from '@nestjs/common';
import { RatingService } from './ratings.service';
import { RatingDto } from './dto/rating.dto';
import { RatingEntity } from '../migrations/rating.entity';

@Controller('ratings')
export class RatingController {
  constructor(private readonly ratingService: RatingService) {}

  @Post(':idSubscription')
  async createRating(
    @Param('idSubscription') idSubscription: number,
    @Body() ratingDto: RatingDto,
  ): Promise<RatingEntity> {
    return this.ratingService.createRating(idSubscription, ratingDto);
  }

  @Get(':idSubscription')
  async getRatings(
    @Param('idSubscription') idSubscription: number,
  ): Promise<RatingEntity[]> {
    return this.ratingService.getRatings(idSubscription);
  }

  @Get('/single/:idRating')
  async getRating(@Param('idRating') idRating: number): Promise<RatingEntity> {
    return this.ratingService.getRating(idRating);
  }
  
}
