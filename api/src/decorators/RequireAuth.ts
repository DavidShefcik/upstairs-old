import { SetMetadata } from '@nestjs/common';
import { IS_PUBLIC_KEY } from './Public';

export const RequireAuth = () => SetMetadata(IS_PUBLIC_KEY, false);
