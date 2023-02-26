import type { InputHTMLAttributes, ReactElement, FocusEvent } from 'react';

import { useFormContext } from '~/presentation/contexts';

import './styles.scss';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	name: string;
}

export function Input(props: InputProps): ReactElement {
	const { inputError } = useFormContext();

	function enableInput(event: FocusEvent<HTMLInputElement, Element>): void {
		event.target.readOnly = false;
	}

	function getTitle(): string | undefined {
		return inputError[props.name]?.message;
	}

	function getStatus(): string {
		return inputError[props.name] ? '🔴' : '';
	}

	return (
		<div className="container">
			<input {...props} className="input" readOnly onFocus={enableInput} />
			<span
				data-testid={`${props.name}-status`}
				title={getTitle()}
				className="status"
			>
				{getStatus()}
			</span>
		</div>
	);
}
