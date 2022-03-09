import { Injectable, Logger } from '@nestjs/common';
import { JwtService as NestJwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { DateTime } from 'luxon';

import { PrismaService } from '~/modules/utils/prisma';
import { UnauthorizedError } from '~/exceptions/general';
import { UsersService } from '~/modules/users';
import { Cron } from '@nestjs/schedule';

interface IGenerateJWTArgs {
  userId: string;
  email: string;
}
interface IJWTPayload {
  email: string;
  sub: string; // User ID
  iat: number; // Issued at
  exp?: number;
}

@Injectable()
export class JwtService {
  constructor(
    private readonly jwtService: NestJwtService,
    private readonly prismaService: PrismaService,
    private readonly usersService: UsersService,
  ) {}

  private readonly logger = new Logger(JwtService.name);

  /**
   * Generate a new JWT using the given user ID and email
   *
   * @param userId - The ID of the user
   * @param email - The email of the user
   * @returns The newly generated JWT
   */
  generateJWT({ userId, email }: IGenerateJWTArgs): string {
    const tokenIssuedAtEpochSeconds = DateTime.now().toSeconds();

    const jwtPayload: IJWTPayload = {
      email,
      sub: userId,
      iat: tokenIssuedAtEpochSeconds,
    };

    return this.jwtService.sign(jwtPayload);
  }

  /**
   * Decode the data from a given JWT
   *
   * @param token - The token to decode
   * @returns The data from the token or `null` if the token is invalid
   */
  async decodeJWT(token: string): Promise<IJWTPayload | null> {
    const tokenPayload = (await this.jwtService.decode(token)) as IJWTPayload;

    return tokenPayload;
  }

  /**
   * Revoke a JWT by creating a row in the revoked
   * JWT table containing the given JWT
   *
   * @param token - The token to revoke
   * @returns boolean if the token was successfully revoked or not
   */
  async revokeJWT(token: string): Promise<boolean> {
    const { exp } = await this.decodeJWT(token);

    const tokenExpiresAt = DateTime.fromSeconds(exp).toJSDate();

    try {
      await this.prismaService.revokedJWT.create({
        data: {
          token,
          tokenExpiresAt,
        },
      });

      return true;
    } catch {
      return false;
    }
  }

  /**
   * Check if a given JWT is marked as revoked in
   * the revoked JWT table
   *
   * @param token - The token to check if it is revoked or not
   * @returns boolean if the toke is revoked or not
   */
  async checkRevokedJWT(token: string): Promise<boolean> {
    const revokedJWT = await this.prismaService.revokedJWT.findUnique({
      where: {
        token,
      },
    });

    return !!revokedJWT;
  }

  /**
   * Check if a given JWT is valid by verifying it
   * with the Nest JWT service, checking if it is
   * revoked or not, and check if the user it belongs
   * to is valid
   *
   * @param token - The token to check if it is valid or not
   * @returns boolean if the token is valid or not
   */
  async checkValidJWT(token: string): Promise<boolean | void> {
    const tokenRevoked = await this.checkRevokedJWT(token);

    if (tokenRevoked) {
      return false;
    }

    const verifyResult = this.jwtService.verify(token);
    if (!verifyResult) {
      throw new UnauthorizedError();
    }

    const isJWTRevoked = await this.checkRevokedJWT(token);
    if (isJWTRevoked) {
      throw new UnauthorizedError();
    }

    const { sub: userId } = await this.decodeJWT(token);

    const userData = await this.usersService.findUserById(userId);
    if (!userData) {
      throw new UnauthorizedError();
    }

    return true;
  }

  /**
   * Extract a token from a given request by trying to grab
   * it from either the cookies or the authorization header.
   * Strip the bearer keyword from the authorization header.
   *
   * @param request - The request to grab the token from
   * @returns a string containing the token, `null` if no token
   * was found
   */
  extractTokenFromRequest(request: Request): string | null {
    let token = '';

    if (request.cookies && request.cookies.token) {
      token = request.cookies.token;
    } else if (request.headers.authorization) {
      token = request.headers.authorization.replace('Bearer', '').trim();
    }

    if (token) {
      return token;
    } else {
      return null;
    }
  }

  /**
   * Private cron job to delete revoked tokens from the
   * revoked JWT table when the current time is passed their
   * expiration date.
   */
  @Cron('* * * * *')
  private async clearRevokedJWT() {
    /**
     * Get all revoked JWT where the expiration date
     * is before or equal to now
     */
    const now = DateTime.now().toJSDate();

    const { count } = await this.prismaService.revokedJWT.deleteMany({
      where: {
        tokenExpiresAt: {
          lte: now,
        },
      },
    });

    if (count > 0) {
      Logger.log(`Deleted ${count} revoked JWTs from the database`);
    }
  }
}
