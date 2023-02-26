import type { ReactElement } from 'react';
import './styles.scss';

export function Spinner(): ReactElement {
	return (
		<div className="spinner">
			<div />
			<div />
			<div />
			<div />
		</div>
	);
}
