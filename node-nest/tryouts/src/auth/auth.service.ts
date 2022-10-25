import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argon from 'argon2';
import { AuthDto } from './dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { config } from 'process';

@Injectable()
export class AuthService {
  constructor(
    private jwt: JwtService,
    private prisma: PrismaService,
    private config: ConfigService,
  ) {}

  //signup logics
  async signin(dto: AuthDto) {
    //find if the user exsists?
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    //  if not user is found  throw an error
    if (!user) throw new ForbiddenException('No mached credentials found');
    // compare the passwords i hash mode
    const pwmatch = await argon.verify(user.hash, dto.password);
    // send back auth data
    if (!pwmatch) throw new ForbiddenException('NO matched credentials found');
    //reruen the saved user with success message
    return this.signToken(user.id, user.email);
  }

  //sigin logic
  async signup(dto: AuthDto) {
    // generate the hash of the password
    try {
      const hash = await argon.hash(dto.password);

      // save the new user in the database
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          hash,
        },
      });
      delete user.hash;
      return this.signToken(user.id, user.email);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials already taken');
        }
      }
      throw error;
    }
  }

  // sign token

  async signToken(
    userId: number,
    email: string,
  ): Promise<{
    accessToken: string;
  }> {
    const payload = {
      sub: userId,
      email,
    };
    const token = await this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret: this.config.get('JWT_SECRET'),
    });

    return {
      accessToken: token,
    };
  }
}
