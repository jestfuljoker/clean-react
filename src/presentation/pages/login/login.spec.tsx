import { render } from '@testing-library/react';

import { Login } from '~/presentation/pages';

describe('Login Component', () => {
	it('should start with initial state', () => {
		const { getByTestId } = render(<Login />);

		const errorContainer = getByTestId('error-container');

		expect(errorContainer.childElementCount).toBe(0);

		const submitButton = getByTestId('submit-button') as HTMLButtonElement;

		expect(submitButton.disabled).toBe(true);
	});
});
