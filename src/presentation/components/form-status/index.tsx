import type { ReactElement } from 'react';

import { useFormContext } from '~/presentation/contexts';

import { Spinner } from '../spinner';

import './styles.scss';

export function FormStatus(): ReactElement {
	const { isLoading, errorMessage } = useFormContext();

	return (
		<div data-testid="error-container" className="error-container">
			{isLoading && <Spinner />}
			{errorMessage && <span className="error">{errorMessage}</span>}
		</div>
	);
}
