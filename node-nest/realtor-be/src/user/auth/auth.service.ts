import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { UserType } from '@prisma/client';
interface SignUpParams {
  name: string;
  email: string;
  phone: string;
  password: string;
}

@Injectable()
export class AuthService {
  constructor(private readonly prismaservice: PrismaService) {}

  async signup({ name, email, phone, password }: SignUpParams) {
    const userExists = await this.prismaservice.user.findUnique({
      where: {
        email,
      },
    });

    if (userExists) {
      throw new ConflictException('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.prismaservice.user.create({
      data: {
        name,
        email,
        phone,
        password: hashedPassword,
        user_type: UserType.BUYER,
      },
    });

    const token = jwt.sign(
      {
        name,
        email,
        phone,
      },
      'nfgkjjfkjlafjkhnklafjhaflkshghagjhgkjalksahjfahkajbhlakfhsalkh',
      {
        expiresIn: '3600000',
      },
    );
    return token;
  }

  signIn() {}
}
