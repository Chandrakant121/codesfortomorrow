import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials-dto';
import { AuthService } from './auth.service';
import { UserLoginDto } from './dto/login.dto';
import { UserRegistrationDto } from './dto/registration.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  async userRegistration(@Body(ValidationPipe) userRegister: UserRegistrationDto) {
    return await this.authService.userRegistration(userRegister)
  }
  
  @Post('/login')
  async userLogin(@Body(ValidationPipe) userLoginDto: UserLoginDto) {
    return await this.authService.validateUser(userLoginDto);
  }
}
