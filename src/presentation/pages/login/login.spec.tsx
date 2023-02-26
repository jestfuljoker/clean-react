import { faker } from '@faker-js/faker';
import type { RenderResult } from '@testing-library/react';
import { render, cleanup, fireEvent } from '@testing-library/react';

import { Login } from '~/presentation/pages';
import { ValidationSpy } from '~/presentation/test';

type SutTypes = {
	sut: RenderResult;
	validationSpy: ValidationSpy;
};

function makeSut(): SutTypes {
	const validationSpy = new ValidationSpy();
	const sut = render(<Login validation={validationSpy} />);

	return {
		sut,
		validationSpy,
	};
}

describe('Login Component', () => {
	afterEach(cleanup);

	it('should start with initial state', () => {
		const { sut } = makeSut();

		const errorContainer = sut.getByTestId('error-container');

		const submitButton = sut.getByTestId('submit-button') as HTMLButtonElement;

		const emailInputStatus = sut.getByTestId(
			'email-status',
		) as HTMLInputElement;

		const passwordInputStatus = sut.getByTestId(
			'password-status',
		) as HTMLInputElement;

		expect(errorContainer.childElementCount).toBe(0);

		expect(submitButton.disabled).toBe(true);

		expect(emailInputStatus.title).toBe('');
		expect(emailInputStatus.textContent).toBe('');

		expect(passwordInputStatus.title).toBe('');
		expect(passwordInputStatus.textContent).toBe('');
	});

	it('should call Validation with correct email', () => {
		const email = faker.internet.email();
		const { sut, validationSpy } = makeSut();
		const emailInput = sut.getByTestId('email');

		fireEvent.input(emailInput, { target: { value: email } });

		expect(validationSpy.fieldName).toBe('email');
		expect(validationSpy.fieldValue).toBe(email);
	});

	it('should call Validation with correct password', () => {
		const password = faker.internet.password();

		const { sut, validationSpy } = makeSut();
		const passwordInput = sut.getByTestId('password');

		fireEvent.input(passwordInput, { target: { value: password } });

		expect(validationSpy.fieldName).toEqual('password');
		expect(validationSpy.fieldValue).toEqual(password);
	});
});
