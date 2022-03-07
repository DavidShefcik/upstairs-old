import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { Request } from 'express';

import { JwtService } from '../jwt.service';
import { UnauthorizedError } from '~/exceptions/general';
import { UsersService } from '~/modules/users';

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
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {
    super({
      secretOrKey: process.env.JWT_SECRET,
      jwtFromRequest: JwtStrategy.jwtFromRequest,
      ignoreExpiration: false,
      passReqToCallback: true,
    });
  }

  static jwtFromRequest(req: Request) {
    if (req.headers.authorization) {
      // We have to remove Bearer from the token here because for some reason
      // validate wont be called if the string here has Bearer in the token
      return req.headers.authorization.replace('Bearer', '').trim();
    } else if (req.cookies && req.cookies.token) {
      return req.cookies.token;
    } else {
      return null;
    }
  }

  async validate(
    request: Request,
    payload: JwtPayload,
  ): Promise<JwtValidateResult> {
    const userId = payload.sub;

    const token = this.jwtService.extractTokenFromRequest(request);

    if (!token) {
      throw new UnauthorizedError();
    }

    const isValidJWT = await this.jwtService.checkValidJWT(token);

    if (!isValidJWT) {
      throw new UnauthorizedError();
    }

    return {
      userId,
      email: payload.email,
    };
  }
}
