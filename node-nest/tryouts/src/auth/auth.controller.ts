import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  @UseInterceptors(FileInterceptor('file')) // for intersepting form-data
  signup(@Body() dto: any) {
    // DTO == Data Transfer object
    return this.authService.signup(dto);
  }

  @Post('login')
  @UseInterceptors(FileInterceptor('file'))
  signin(@Body() dto: AuthDto) {
    return this.authService.signin(dto);
  }
}
