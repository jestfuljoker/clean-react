import type { Validation } from '../protocols';

export class ValidationSpy implements Validation {
	errorMessage: string;
	fieldName: unknown;
	fieldValue: unknown;

	validate<T>(name: keyof T, value: T[keyof T]): string {
		this.fieldName = name;
		this.fieldValue = value;

		return this.errorMessage;
	}
}
