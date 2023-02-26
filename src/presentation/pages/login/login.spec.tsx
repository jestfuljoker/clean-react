import type { RenderResult } from '@testing-library/react';
import { render } from '@testing-library/react';

import { Login } from '~/presentation/pages';

type SutTypes = {
	sut: RenderResult;
};

function makeSut(): SutTypes {
	const sut = render(<Login />);

	return {
		sut,
	};
}

describe('Login Component', () => {
	it('should start with initial state', () => {
		const { sut } = makeSut();

		const errorContainer = sut.getByTestId('error-container');

		expect(errorContainer.childElementCount).toBe(0);

		const submitButton = sut.getByTestId('submit-button') as HTMLButtonElement;

		expect(submitButton.disabled).toBe(true);

		const emailInputStatus = sut.getByTestId(
			'email-status',
		) as HTMLInputElement;

		expect(emailInputStatus.title).toBe('');
		expect(emailInputStatus.textContent).toBe('');

		const passwordInputStatus = sut.getByTestId(
			'password-status',
		) as HTMLInputElement;

		expect(passwordInputStatus.title).toBe('');
		expect(passwordInputStatus.textContent).toBe('');
	});
});
