import { InvalidFieldError } from '~/validation/errors';
import type { FieldValidation } from '~/validation/protocols';

export class EmailValidation implements FieldValidation {
	constructor(readonly field: string) {}

	validate(value: string): Error | null {
		const emailRegex =
			/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

		return !value || emailRegex.test(value)
			? null
			: new InvalidFieldError(this.field);
	}
}
