import { FieldValidationSpy } from '../test/mock-field-validation';
import { ValidationComposite } from './validation-composite';

describe('ValidationComposite', () => {
	it('should return error if any validation fails', () => {
		const fieldValidationSpy = new FieldValidationSpy('any_field');
		const fieldValidationSpy2 = new FieldValidationSpy('any_field');

		fieldValidationSpy2.error = new Error('any_error_message');

		const sut = new ValidationComposite([
			fieldValidationSpy,
			fieldValidationSpy2,
		]);

		const error = sut.validate('any_field', 'any_value');

		expect(error).toBe('any_error_message');
	});
});