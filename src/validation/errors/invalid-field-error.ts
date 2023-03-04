export class InvalidFieldError extends Error {
	constructor(readonly field: string) {
		super(`The field "${field}" is invalid!`);
		this.name = 'InvalidFieldError';
	}
}
