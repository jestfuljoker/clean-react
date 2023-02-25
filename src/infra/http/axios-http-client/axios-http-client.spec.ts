import type axios from 'axios';

import { mockPostRequest } from '~/data/test';

import { mockAxios } from '../../test';
import { AxiosHttpClient } from './axios-http-client';

jest.mock('axios');

type SutTypes = {
	sut: AxiosHttpClient;
	mockedAxios: jest.Mocked<typeof axios>;
};

function makeSut(): SutTypes {
	const sut = new AxiosHttpClient();
	const mockedAxios = mockAxios();

	return {
		mockedAxios,
		sut,
	};
}

describe('Axios Http Client', () => {
	it('should call axios with correct value', async () => {
		const request = mockPostRequest();
		const { sut, mockedAxios } = makeSut();

		await sut.post(request);

		expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body);
	});

	it('should return the correct status code and body', () => {
		const { sut, mockedAxios } = makeSut();

		const promise = sut.post(mockPostRequest());

		expect(promise).toEqual(mockedAxios.post.mock.results[0].value);
	});
});
