import type { Validation } from '../protocols';

export class ValidationStub implements Validation {
	errorMessage: string;

	validate<T>(_name: keyof T, _value: T[keyof T]): string | null {
		return this.errorMessage;
	}
}
