import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials-dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt/dist';
import { JwtPayload } from './jwt.interface';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { UserLoginDto } from './dto/login.dto';
import { UserRegistrationDto } from './dto/registration.dto';
@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async userRegistration(userRegister: UserRegistrationDto) {
    const user = new User()
    user.name = userRegister.name;
    user.email = userRegister.email;
    user.password = userRegister.password
    return await user.save()
  }

  async validateUser(
    userLoginDto: UserLoginDto,
  ): Promise<{ accessToken: string }> {
    const { email, password } = userLoginDto;
    const user = await this.userRepository.findOne({ where: { email } });

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JwtPayload = { email };
      const accessToken: string = await this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException('Please check your login credentials');
    }
  }
}
