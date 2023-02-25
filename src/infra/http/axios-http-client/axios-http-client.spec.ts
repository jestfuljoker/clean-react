import { faker } from '@faker-js/faker';
import axios from 'axios';

import type { HttpPostParams } from '~/data/protocols/http';

import { AxiosHttpClient } from './axios-http-client';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

function makeSut(): AxiosHttpClient {
	return new AxiosHttpClient();
}

function mockPostRequest(): HttpPostParams<unknown> {
	return {
		url: faker.internet.url(),
		body: faker.helpers.arrayElement(),
	};
}

describe('Axios Http Client', () => {
	it('should call axios with correct value', async () => {
		const request = mockPostRequest();
		const sut = makeSut();

		await sut.post(request);

		expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body);
	});
});
