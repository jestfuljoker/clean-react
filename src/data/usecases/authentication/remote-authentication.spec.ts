import { HttpPostClientSpy } from '../../test/mock-http-client';
import { RemoteAuthentication } from './remote-authentication';
import { faker } from '@faker-js/faker';

type SutTypes = {
	sut: RemoteAuthentication;
	httpPostClientSpy: HttpPostClientSpy;
};

function makeSut(url = faker.internet.url()): SutTypes {
	const httpPostClientSpy = new HttpPostClientSpy();
	const sut = new RemoteAuthentication(url, httpPostClientSpy); // system under test

	return {
		sut,
		httpPostClientSpy,
	};
}

describe('RemoteAuthentication', () => {
	it('should call HttpPostClient with correct URL', async () => {
		const url = faker.internet.url();
		const { sut, httpPostClientSpy } = makeSut(url);

		await sut.auth();

		expect(httpPostClientSpy.url).toBe(url);
	});
});
