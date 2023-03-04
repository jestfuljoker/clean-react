import { InvalidFieldError } from '~/validation/errors';
import type { FieldValidation } from '~/validation/protocols';

export class EmailValidation implements FieldValidation {
	constructor(readonly field: string) {}

	validate(_value: string): Error | null {
		return new InvalidFieldError(this.field);
	}
}
