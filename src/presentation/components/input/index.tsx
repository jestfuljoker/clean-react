import type { InputHTMLAttributes, ReactElement, FocusEvent } from 'react';

import './styles.scss';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export function Input(props: InputProps): ReactElement {
	function enableInput(event: FocusEvent<HTMLInputElement, Element>): void {
		event.target.readOnly = false;
	}

	return (
		<div className="container">
			<input {...props} className="input" readOnly onFocus={enableInput} />
			<span className="status">🔴</span>
		</div>
	);
}
