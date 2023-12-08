import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateNewUserDto } from './dto/CreateNewUser.dto';
import { AuthentificationDto } from './dto/Authentification.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body() createNewUser: CreateNewUserDto): Promise<void> {
    return this.authService.signUp(createNewUser);
  }

  @Post('/signin')
  signIn(@Body() auth: AuthentificationDto): Promise<{ accessToken: string }> {
    return this.authService.signIn(auth);
  }

  @Post('logout')
  logout() {
    return { message: 'Logged Out Successfully!' };
  }
}
