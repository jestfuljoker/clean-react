import type { ReactElement } from 'react';

import { Spinner } from '../spinner';

import './styles.scss';

export function FormStatus(): ReactElement {
	return (
		<div className="error-container">
			<Spinner />
			<span className="error">Error</span>
		</div>
	);
}
