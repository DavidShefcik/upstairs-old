import { Resolver, Args, Mutation } from '@nestjs/graphql';

import { Public } from '~/decorators/Public';
import {
  LoginResponse,
  TokenResponse,
  RequestPasswordResetResponse,
  ResetPasswordResponse,
} from '~/graphql';
import { AuthService } from './auth.service';

@Resolver('Auth')
@Public()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation()
  async login(
    @Args('email') email: string,
    @Args('password') password: string,
  ): Promise<LoginResponse> {
    const loginResult = await this.authService.login({
      email,
      password,
    });

    return loginResult;
  }

  // @Mutation()
  // async verifyLogin(@Args('code') code: string): Promise<TokenResponse> {}

  @Mutation()
  async register(
    @Args('email') email: string,
    @Args('password') password: string,
    @Args('firstName') firstName: string,
    @Args('lastName') lastName: string,
  ): Promise<TokenResponse> {
    const registerResult = await this.authService.register({
      email,
      password,
      firstName,
      lastName,
    });

    return registerResult;
  }

  // @Mutation()
  // async requestPasswordReset(
  //   @Args('email') email: string,
  // ): Promise<RequestPasswordResetResponse> {}

  // @Mutation()
  // async resetPassword(
  //   @Args('code') code: string,
  //   @Args('password') password: string,
  // ): Promise<ResetPasswordResponse> {}
}
