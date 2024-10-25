import { IEnv } from './model/env.interface';

import { environment as envDev } from './environment';

export const environment: IEnv = {
	...envDev,
	isProd: true,
};
