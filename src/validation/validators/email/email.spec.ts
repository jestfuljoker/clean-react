import { faker } from '@faker-js/faker';

import { InvalidFieldError } from '~/validation/errors';

import { EmailValidation } from './email-validation';

function makeSut(field: string = faker.database.column()): EmailValidation {
	return new EmailValidation(field);
}

describe('EmailValidation', () => {
	it('should return error if email is invalid', () => {
		const field = faker.database.column();
		const sut = makeSut(field);
		const error = sut.validate(faker.random.word());

		expect(error).toEqual(new InvalidFieldError(field));
	});

	it('should return falsy if email is valid', () => {
		const sut = makeSut();
		const error = sut.validate(faker.internet.email());

		expect(error).toBeFalsy();
	});

	it('should return falsy if email is empty', () => {
		const sut = makeSut();
		const error = sut.validate('');

		expect(error).toBeFalsy();
	});
});
