import { faker } from '@faker-js/faker';

import type { HttpPostParams } from '../protocols/http';

export function mockPostRequest(): HttpPostParams<unknown> {
	return {
		url: faker.internet.url(),
		body: faker.helpers.arrayElement(),
	};
}
