import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { AuthService } from './auth.service';
import { RegistrationEntity } from 'src/entities/registration.entity';
import { LoginUserDto } from '../dtos/login-user.dto';
import { LoginEntity } from '../entities/login.entity';
import { SearchUsersDto } from 'src/dtos/searchUsersDto';



@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}


  @Post('register')
  async register(@Body() createUserDto: CreateUserDto): Promise<RegistrationEntity> {
    return await this.authService.register(createUserDto)
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto): Promise<LoginEntity> {
    return await this.authService.login(loginUserDto)
  }

  @Get('search')
  async searchUsers(@Query() searchUsersDto: SearchUsersDto) {
    return await this.authService.searchUsers(searchUsersDto)
  }

}
