import { faker } from '@faker-js/faker';

import { HttpStatusCode } from '~/data/protocols/http/http-response';
import { HttpPostClientSpy } from '~/data/test/mock-http-client';
import { InvalidCredentialsError } from '~/domain/errors/invalid-credentials-error';
import { UnexpectedError } from '~/domain/errors/unexpected-error';
import type { AccountModel } from '~/domain/models/accountModel';
import {
	mockAccountModel,
	mockAuthentication,
} from '~/domain/test/mock-account';
import type { AuthenticationParams } from '~/domain/usecases/authentication';

import { RemoteAuthentication } from './remote-authentication';

type SutTypes = {
	sut: RemoteAuthentication;
	httpPostClientSpy: HttpPostClientSpy<AuthenticationParams, AccountModel>;
};

function makeSut(url = faker.internet.url()): SutTypes {
	const httpPostClientSpy = new HttpPostClientSpy<
		AuthenticationParams,
		AccountModel
	>();
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

		await sut.auth(mockAuthentication());

		expect(httpPostClientSpy.url).toBe(url);
	});

	it('should call HttpPostClient with correct body', async () => {
		const { sut, httpPostClientSpy } = makeSut();
		const authenticationParams = mockAuthentication();

		await sut.auth(authenticationParams);

		expect(httpPostClientSpy.body).toEqual(authenticationParams);
	});

	it('should throw UnexpectedError if HttpPostClient returns 400', async () => {
		const { sut, httpPostClientSpy } = makeSut();

		httpPostClientSpy.response = {
			statusCode: HttpStatusCode.badRequest,
		};

		const promise = sut.auth(mockAuthentication());

		await expect(promise).rejects.toThrow(new UnexpectedError());
	});

	it('should throw InvalidCredentialsError if HttpPostClient returns 401', async () => {
		const { sut, httpPostClientSpy } = makeSut();

		httpPostClientSpy.response = {
			statusCode: HttpStatusCode.unauthorized,
		};

		const promise = sut.auth(mockAuthentication());

		await expect(promise).rejects.toThrow(new InvalidCredentialsError());
	});

	it('should throw UnexpectedError if HttpPostClient returns 404', async () => {
		const { sut, httpPostClientSpy } = makeSut();

		httpPostClientSpy.response = {
			statusCode: HttpStatusCode.notFound,
		};

		const promise = sut.auth(mockAuthentication());

		await expect(promise).rejects.toThrow(new UnexpectedError());
	});

	it('should throw UnexpectedError if HttpPostClient returns 500', async () => {
		const { sut, httpPostClientSpy } = makeSut();

		httpPostClientSpy.response = {
			statusCode: HttpStatusCode.serverError,
		};

		const promise = sut.auth(mockAuthentication());

		await expect(promise).rejects.toThrow(new UnexpectedError());
	});

	it('should return an AccountModel if HttpPostClient returns 200', async () => {
		const { sut, httpPostClientSpy } = makeSut();
		const httpResult = mockAccountModel();

		httpPostClientSpy.response = {
			statusCode: HttpStatusCode.ok,
			body: httpResult,
		};

		const account = await sut.auth(mockAuthentication());

		expect(account).toEqual(httpResult);
	});
});
