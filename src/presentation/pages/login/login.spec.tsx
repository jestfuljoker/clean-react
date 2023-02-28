import { faker } from '@faker-js/faker';
import type { RenderResult } from '@testing-library/react';
import { render, cleanup, fireEvent } from '@testing-library/react';

import { Login } from '~/presentation/pages';
import { ValidationStub } from '~/presentation/test';

type SutTypes = {
	sut: RenderResult;
};

type SutParams = {
	validationError: string;
};

function makeSut(params?: SutParams): SutTypes {
	const validationStub = new ValidationStub();

	validationStub.errorMessage = params?.validationError ?? '';

	const sut = render(<Login validation={validationStub} />);

	return {
		sut,
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
		const validationError = faker.random.words();
		const { sut } = makeSut({
			validationError,
		});
		const emailInput = sut.getByTestId('email');

		fireEvent.input(emailInput, {
			target: { value: faker.internet.email() },
		});

		const emailStatus = sut.getByTestId('email-status');

		expect(emailStatus.title).toBe(validationError);
		expect(emailStatus.textContent).toBe('🔴');
	});

	it('should show password error if Validation fails', () => {
		const validationError = faker.random.words();
		const { sut } = makeSut({
			validationError,
		});
		const passwordInput = sut.getByTestId('password');

		fireEvent.input(passwordInput, {
			target: { value: faker.internet.password() },
		});

		const passwordStatus = sut.getByTestId('password-status');

		expect(passwordStatus.title).toBe(validationError);
		expect(passwordStatus.textContent).toBe('🔴');
	});

	it('should show valid email state if Validation succeeds', () => {
		const { sut } = makeSut();
		const emailInput = sut.getByTestId('email');

		fireEvent.input(emailInput, {
			target: { value: faker.internet.email() },
		});

		const emailStatus = sut.getByTestId('email-status');

		expect(emailStatus.title).toBe('');
		expect(emailStatus.textContent).toBe('');
	});

	it('should show valid password state if Validation succeeds', () => {
		const { sut } = makeSut();
		const passwordInput = sut.getByTestId('password');

		fireEvent.input(passwordInput, {
			target: { value: faker.internet.password() },
		});

		const passwordStatus = sut.getByTestId('password-status');

		expect(passwordStatus.title).toBe('');
		expect(passwordStatus.textContent).toBe('');
	});

	it('should enable submit button if form is valid', () => {
		const { sut } = makeSut();
		const emailInput = sut.getByTestId('email');
		const passwordInput = sut.getByTestId('password');

		fireEvent.input(emailInput, {
			target: { value: faker.internet.email() },
		});

		fireEvent.input(passwordInput, {
			target: { value: faker.internet.password() },
		});

		const submitButton = sut.getByTestId('submit-button') as HTMLButtonElement;

		expect(submitButton.disabled).toBe(false);
	});

	it('should show loading spinner on submit', () => {
		const { sut } = makeSut();
		const emailInput = sut.getByTestId('email');
		const passwordInput = sut.getByTestId('password');

		fireEvent.input(emailInput, {
			target: { value: faker.internet.email() },
		});

		fireEvent.input(passwordInput, {
			target: { value: faker.internet.password() },
		});

		const submitButton = sut.getByTestId('submit-button');

		fireEvent.click(submitButton);

		const spinner = sut.getByTestId('spinner');

		expect(spinner).toBeTruthy();
	});
});
