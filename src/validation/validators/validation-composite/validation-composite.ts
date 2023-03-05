import type { Validation } from '~/presentation/protocols';
import type { FieldValidation } from '~/validation/protocols';

export class ValidationComposite implements Validation {
	constructor(private readonly validators: FieldValidation[]) {}

	validate<T = unknown>(name: keyof T, value: T[keyof T]): string | null {
		if (typeof value !== 'string') {
			throw new TypeError(
				`Type of ${name as string} should be a string but was ${typeof value}`,
			);
		}

		const validators = this.validators.filter(
			(validator) => validator.field === name,
		);

		for (const validator of validators) {
			const error = validator.validate(value);

			if (error) {
				return error.message;
			}
		}

		return null;
	}
}