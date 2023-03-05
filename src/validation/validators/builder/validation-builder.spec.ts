import { faker } from '@faker-js/faker';

import {
	EmailValidation,
	MinLengthValidation,
	RequiredFieldValidation,
} from '~/validation/validators';

import { ValidationBuilder as sut } from './validation-builder';

describe('ValidationBuilder', () => {
	it('should return RequiredFieldValidation', () => {
		const field = faker.database.column();
		const validations = sut.field(field).required().build();

		expect(validations).toEqual([new RequiredFieldValidation(field)]);
	});

	it('should return EmailValidation', () => {
		const field = faker.database.column();
		const validations = sut.field(field).email().build();

		expect(validations).toEqual([new EmailValidation(field)]);
	});

	it('should return MinLengthValidation', () => {
		const field = faker.database.column();
		const len = faker.datatype.number({
			min: 5,
		});
		const validations = sut.field(field).min(len).build();

		expect(validations).toEqual([new MinLengthValidation(field, len)]);
	});

	it('should return a list of validations', () => {
		const field = faker.database.column();
		const len = faker.datatype.number({
			min: 5,
		});

		const validations = sut.field(field).required().min(len).email().build();

		expect(validations).toEqual([
			new RequiredFieldValidation(field),
			new MinLengthValidation(field, len),
			new EmailValidation(field),
		]);
	});
});
