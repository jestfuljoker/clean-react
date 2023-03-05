import 'jest-localstorage-mock';
import { faker } from '@faker-js/faker';
import type { RenderResult } from '@testing-library/react';
import { waitFor, cleanup, fireEvent, render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

import { InvalidCredentialsError } from '~/domain/errors';
import { Login } from '~/presentation/pages';
import { AuthenticationSpy, ValidationStub } from '~/presentation/test';

type SutTypes = {
	sut: RenderResult;
	authenticationSpy: AuthenticationSpy;
};

type SutParams = {
	validationError: string;
};

const history = createMemoryHistory({ initialEntries: ['/login'] });

function makeSut(params?: SutParams): SutTypes {
	const validationStub = new ValidationStub();
	const authenticationSpy = new AuthenticationSpy();

	validationStub.errorMessage = params?.validationError ?? '';

	const sut = render(
		<Router history={history}>
			<Login validation={validationStub} authentication={authenticationSpy} />,
		</Router>,
	);

	return {
		sut,
		authenticationSpy,
	};
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

async function simulateValidSubmit(
	sut: RenderResult,
	email = faker.internet.email(),
	password = faker.internet.password(),
): Promise<void> {
	populateEmailField(sut, email);
	populatePasswordField(sut, password);

	const form = sut.getByTestId('form');

	fireEvent.submit(form);

	await waitFor(() => form);
}

function testStatusForField(
	sut: RenderResult,
	fieldName: string,
	validationError = '',
): void {
	const fieldStatus = sut.getByTestId(`${fieldName}-status`);

	expect(fieldStatus.title).toBe(validationError);
	expect(fieldStatus.textContent).toBe(validationError ? '🔴' : '');
}

function testErrorContainerChildCount(sut: RenderResult, count: number): void {
	const errorContainer = sut.getByTestId('error-container');
	expect(errorContainer.childElementCount).toBe(count);
}

function testElementExists(sut: RenderResult, fieldName: string): void {
	const element = sut.getByTestId(fieldName);
	expect(element).toBeTruthy();
}

function testElementTextContent(
	sut: RenderResult,
	fieldName: string,
	text: string,
): void {
	const element = sut.getByTestId(fieldName);
	expect(element.textContent).toBe(text);
}

function testButtonIsDisabled(
	sut: RenderResult,
	fieldName: string,
	isDisabled: boolean,
): void {
	const button = sut.getByTestId(fieldName) as HTMLButtonElement;

	expect(button.disabled).toBe(isDisabled);
}

describe('Login Component', () => {
	afterEach(cleanup);
	beforeEach(() => {
		localStorage.clear();
	});

	it('should start with initial state', () => {
		const validationError = faker.random.word();

		const { sut } = makeSut({ validationError });

		testErrorContainerChildCount(sut, 0);
		testButtonIsDisabled(sut, 'submit-button', true);
		testStatusForField(sut, 'email', validationError);
		testStatusForField(sut, 'password', validationError);
	});

	it('should show email error if Validation fails', () => {
		const validationError = faker.random.words();

		const { sut } = makeSut({
			validationError,
		});

		populateEmailField(sut);
		testStatusForField(sut, 'email', validationError);
	});

	it('should show password error if Validation fails', () => {
		const validationError = faker.random.words();

		const { sut } = makeSut({
			validationError,
		});

		populatePasswordField(sut);
		testStatusForField(sut, 'password', validationError);
	});

	it('should show valid email state if Validation succeeds', () => {
		const { sut } = makeSut();

		populateEmailField(sut);
		testStatusForField(sut, 'email');
	});

	it('should show valid password state if Validation succeeds', () => {
		const { sut } = makeSut();

		populatePasswordField(sut);
		testStatusForField(sut, 'password');
	});

	it('should enable submit button if form is valid', () => {
		const { sut } = makeSut();

		populateEmailField(sut);
		populatePasswordField(sut);
		testButtonIsDisabled(sut, 'submit-button', false);
	});

	it('should show loading spinner on submit', async () => {
		const { sut } = makeSut();

		await simulateValidSubmit(sut);
		testElementExists(sut, 'spinner');
	});

	it('should call authentication with correct values', async () => {
		const { sut, authenticationSpy } = makeSut();

		const params = {
			email: faker.internet.email(),
			password: faker.internet.password(),
		};

		await simulateValidSubmit(sut, params.email, params.password);
		expect(authenticationSpy.params).toEqual(params);
	});

	it('should call authentication only once', async () => {
		const { sut, authenticationSpy } = makeSut();

		await simulateValidSubmit(sut);
		await simulateValidSubmit(sut);
		expect(authenticationSpy.callsCount).toBe(1);
	});

	it('should not call authentication if form is not valid', async () => {
		const validationError = faker.random.words();

		const { sut, authenticationSpy } = makeSut({
			validationError,
		});

		await simulateValidSubmit(sut);
		expect(authenticationSpy.callsCount).toBe(0);
	});

	it('should show error if Authentication fails', async () => {
		const { sut, authenticationSpy } = makeSut();

		const error = new InvalidCredentialsError();

		jest.spyOn(authenticationSpy, 'auth').mockRejectedValueOnce(error);

		await simulateValidSubmit(sut);
		testErrorContainerChildCount(sut, 1);
		testElementTextContent(sut, 'main-error', error.message);
	});

	it('should add accessToken to localStorage on success ', async () => {
		const { sut, authenticationSpy } = makeSut();

		await simulateValidSubmit(sut);

		expect(localStorage.setItem).toHaveBeenCalledWith(
			'accessToken',
			authenticationSpy.account.accessToken,
		);
		expect(history.length).toBe(1);
		expect(history.location.pathname).toBe('/');
	});

	it('should redirect to signUp page', async () => {
		const { sut } = makeSut();

		const signUp = sut.getByTestId('signUp');

		fireEvent.click(signUp);

		expect(history.length).toBe(2);
		expect(history.location.pathname).toBe('/signUp');
	});
});
