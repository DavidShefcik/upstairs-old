import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';

import { PrismaService } from '~/modules/utils/prisma';

interface JwtPayload {
  sub: string;
  email: string;
}
interface JwtValidateResult {
  userId: string;
  email: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly prismaService: PrismaService) {
    super({
      secretOrKey: process.env.JWT_SECRET,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
    });
  }

  async validate(payload: JwtPayload): Promise<JwtValidateResult> {
    // Check if token is revoked
    console.log('Token payload', payload);

    return { userId: payload.sub, email: payload.email };
  }
}
