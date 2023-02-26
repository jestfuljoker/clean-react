import { render } from '@testing-library/react';

import { Login } from '~/presentation/pages';

describe('Login Component', () => {
	it('should not render spinner and error on start', () => {
		const { getByTestId } = render(<Login />);

		const errorContainer = getByTestId('error-container');
		expect(errorContainer.childElementCount).toBe(0);
	});
});
