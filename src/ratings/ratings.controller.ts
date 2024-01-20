import { Controller, Param, Post, Body, Get } from '@nestjs/common';
import { RatingService } from './ratings.service';
import { RatingDto } from './dto/rating.dto';
import { RatingEntity } from '../migrations/rating.entity';
import { ServiceProviderEntity } from '../migrations/service-provider.entity';

@Controller('ratings')
export class RatingController {
  constructor(private readonly ratingService: RatingService) {}

  @Post(':idJob/new')
  async createRating(
    @Param('idJob') idJob: number,
    @Body() ratingDto: RatingDto,
  ): Promise<RatingEntity> {
    return this.ratingService.createRating(idJob, ratingDto);
  }

  @Get('/serviceProvider/:idServiceProvider')
  async getServiceProviderRatings(
    @Param('idServiceProvider') idServiceProvider: number,
  ): Promise<ServiceProviderEntity> {
    return this.ratingService.getServiceProviderRating(idServiceProvider);
  }

  @Get('/:idRating')
  async getRating(@Param('idRating') idRating: number): Promise<RatingEntity> {
    return this.ratingService.getRating(idRating);
  }

  @Get('/')
  async getAllRatings(): Promise<RatingEntity[]> {
    return this.ratingService.getRatings();
  }
}
