import { AuthService } from './auth.service';
import { Controller, Post, Body } from '@nestjs/common';
import { SignUpDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authservice: AuthService) {}
  @Post('/signup')
  signup(@Body() body: SignUpDto) {
    return this.authservice.signup(body);
  }
}
