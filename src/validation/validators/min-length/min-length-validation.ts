import { InvalidFieldError } from '~/validation/errors';
import type { FieldValidation } from '~/validation/protocols';

export class MinLengthValidation implements FieldValidation {
	constructor(readonly field: string, private readonly minLength: number) {}

	validate(_value: string): Error | null {
		return new InvalidFieldError(this.field);
	}
}
