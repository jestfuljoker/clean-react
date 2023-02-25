import { faker } from '@faker-js/faker';

import type { AccountModel } from '../models';
import type { AuthenticationParams } from '../usecases';

export const mockAuthentication = (): AuthenticationParams => ({
	email: faker.internet.email(),
	password: faker.internet.password(),
});

export const mockAccountModel = (): AccountModel => ({
	accessToken: faker.datatype.uuid(),
});
