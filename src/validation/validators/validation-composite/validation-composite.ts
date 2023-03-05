import type { Validation } from '~/presentation/protocols';
import type { FieldValidation } from '~/validation/protocols';

export class ValidationComposite implements Validation {
	private constructor(private readonly validators: FieldValidation[]) {}

	static build(validators: FieldValidation[]): ValidationComposite {
		return new ValidationComposite(validators);
	}

	validate<T = unknown>(name: keyof T, value: T[keyof T]): string {
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

		return '';
	}
}
