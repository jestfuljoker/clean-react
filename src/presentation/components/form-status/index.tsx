import type { ReactElement } from 'react';

import { useFormContext } from '~/presentation/contexts';

import { Spinner } from '../spinner';

import './styles.scss';

export function FormStatus(): ReactElement {
	const { isLoading, formError } = useFormContext();

	return (
		<div data-testid="error-container" className="error-container">
			{isLoading && <Spinner />}
			{formError?.message && <span className="error">{formError.message}</span>}
		</div>
	);
}
