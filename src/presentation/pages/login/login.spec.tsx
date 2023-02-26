import { render } from '@testing-library/react';

import { Login } from '~/presentation/pages';

describe('Login Component', () => {
	it('should start with initial state', () => {
		const { getByTestId } = render(<Login />);

		const errorContainer = getByTestId('error-container');

		expect(errorContainer.childElementCount).toBe(0);

		const submitButton = getByTestId('submit-button') as HTMLButtonElement;

		expect(submitButton.disabled).toBe(true);

		const emailInputStatus = getByTestId('email-status') as HTMLInputElement;

		expect(emailInputStatus.title).toBe('');
		expect(emailInputStatus.textContent).toBe('');

		const passwordInputStatus = getByTestId(
			'password-status',
		) as HTMLInputElement;

		expect(passwordInputStatus.title).toBe('');
		expect(passwordInputStatus.textContent).toBe('');
	});
});
