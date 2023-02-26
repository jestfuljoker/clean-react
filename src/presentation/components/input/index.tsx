import type { InputHTMLAttributes, ReactElement } from 'react';

import './styles.scss';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export function Input(props: InputProps): ReactElement {
	return (
		<div className="container">
			<input {...props} className="input" />
			<span className="status">🔴</span>
		</div>
	);
}
