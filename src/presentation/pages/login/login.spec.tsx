import { faker } from '@faker-js/faker';
import type { RenderResult } from '@testing-library/react';
import { render, cleanup, fireEvent } from '@testing-library/react';

import { Login } from '~/presentation/pages';
import { ValidationStub } from '~/presentation/test';

type SutTypes = {
	sut: RenderResult;
	validationStub: ValidationStub;
};

function makeSut(): SutTypes {
	const validationStub = new ValidationStub();

	const sut = render(<Login validation={validationStub} />);

	return {
		sut,
		validationStub,
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

	it('should show email error if Validation fails', () => {
		const { sut, validationStub } = makeSut();
		const emailInput = sut.getByTestId('email');

		validationStub.errorMessage = faker.random.words();

		fireEvent.input(emailInput, {
			target: { value: faker.internet.email() },
		});

		const emailStatus = sut.getByTestId('email-status');

		expect(emailStatus.title).toBe(validationStub.errorMessage);
		expect(emailStatus.textContent).toBe('🔴');
	});

	it('should show password error if Validation fails', () => {
		const { sut, validationStub } = makeSut();
		const passwordInput = sut.getByTestId('password');

		validationStub.errorMessage = faker.random.words();

		fireEvent.input(passwordInput, {
			target: { value: faker.internet.password() },
		});

		const passwordStatus = sut.getByTestId('password-status');

		expect(passwordStatus.title).toBe(validationStub.errorMessage);
		expect(passwordStatus.textContent).toBe('🔴');
	});

	it('should show valid email state if Validation succeeds', () => {
		const { sut, validationStub } = makeSut();
		const emailInput = sut.getByTestId('email');

		validationStub.errorMessage = '';

		fireEvent.input(emailInput, {
			target: { value: faker.internet.email() },
		});

		const emailStatus = sut.getByTestId('email-status');

		expect(emailStatus.title).toBe('');
		expect(emailStatus.textContent).toBe('');
	});
});
