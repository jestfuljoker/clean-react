import { faker } from '@faker-js/faker';
import type { RenderResult } from '@testing-library/react';
import { cleanup, fireEvent, render } from '@testing-library/react';

import { Login } from '~/presentation/pages';
import { AuthenticationSpy, ValidationStub } from '~/presentation/test';

type SutTypes = {
	sut: RenderResult;
	authenticationSpy: AuthenticationSpy;
};

type SutParams = {
	validationError: string;
};

function makeSut(params?: SutParams): SutTypes {
	const validationStub = new ValidationStub();
	const authenticationSpy = new AuthenticationSpy();

	validationStub.errorMessage = params?.validationError ?? '';

	const sut = render(
		<Login validation={validationStub} authentication={authenticationSpy} />,
	);

	return {
		sut,
		authenticationSpy,
	};
}

function simulateValidSubmit(
	sut: RenderResult,
	email = faker.internet.email(),
	password = faker.internet.password(),
): void {
	const emailInput = sut.getByTestId('email');
	const passwordInput = sut.getByTestId('password');

	fireEvent.input(emailInput, {
		target: { value: email },
	});

	fireEvent.input(passwordInput, {
		target: { value: password },
	});

	const submitButton = sut.getByTestId('submit-button');

	fireEvent.click(submitButton);
}

function populateEmailField(
	sut: RenderResult,
	email = faker.internet.email(),
): void {
	const emailInput = sut.getByTestId('email');

	fireEvent.input(emailInput, {
		target: { value: email },
	});
}

function populatePasswordField(
	sut: RenderResult,
	password = faker.internet.password(),
): void {
	const passwordInput = sut.getByTestId('password');

	fireEvent.input(passwordInput, {
		target: { value: password },
	});
}

function simulateStatusForField(
	sut: RenderResult,
	fieldName: string,
	validationError = '',
): void {
	const fieldStatus = sut.getByTestId(`${fieldName}-status`);

	expect(fieldStatus.title).toBe(validationError);
	expect(fieldStatus.textContent).toBe(validationError ? '🔴' : '');
}

describe('Login Component', () => {
	afterEach(cleanup);

	it('should start with initial state', () => {
		const { sut } = makeSut();

		simulateStatusForField(sut, 'email');

		simulateStatusForField(sut, 'password');

		const errorContainer = sut.getByTestId('error-container');
		expect(errorContainer.childElementCount).toBe(0);

		const submitButton = sut.getByTestId('submit-button') as HTMLButtonElement;
		expect(submitButton.disabled).toBe(true);
	});

	it('should show email error if Validation fails', () => {
		const validationError = faker.random.words();

		const { sut } = makeSut({
			validationError,
		});

		populateEmailField(sut);

		simulateStatusForField(sut, 'email', validationError);
	});

	it('should show password error if Validation fails', () => {
		const validationError = faker.random.words();

		const { sut } = makeSut({
			validationError,
		});

		populatePasswordField(sut);

		simulateStatusForField(sut, 'password', validationError);
	});

	it('should show valid email state if Validation succeeds', () => {
		const { sut } = makeSut();

		populateEmailField(sut);

		simulateStatusForField(sut, 'email');
	});

	it('should show valid password state if Validation succeeds', () => {
		const { sut } = makeSut();

		populatePasswordField(sut);

		simulateStatusForField(sut, 'password');
	});

	it('should enable submit button if form is valid', () => {
		const { sut } = makeSut();

		populateEmailField(sut);

		populatePasswordField(sut);

		const submitButton = sut.getByTestId('submit-button') as HTMLButtonElement;

		expect(submitButton.disabled).toBe(false);
	});

	it('should show loading spinner on submit', () => {
		const { sut } = makeSut();

		simulateValidSubmit(sut);

		const spinner = sut.getByTestId('spinner');

		expect(spinner).toBeTruthy();
	});

	it('should call authentication with correct values', () => {
		const { sut, authenticationSpy } = makeSut();

		const params = {
			email: faker.internet.email(),
			password: faker.internet.password(),
		};

		simulateValidSubmit(sut, params.email, params.password);

		expect(authenticationSpy.params).toEqual(params);
	});

	it('should call authentication only once', () => {
		const { sut, authenticationSpy } = makeSut();

		simulateValidSubmit(sut);
		simulateValidSubmit(sut);

		expect(authenticationSpy.callsCount).toBe(1);
	});
});
