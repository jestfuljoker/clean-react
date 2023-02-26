import type {
	InputHTMLAttributes,
	ReactElement,
	FocusEvent,
	ChangeEvent,
} from 'react';

import { useFormContext } from '~/presentation/contexts';

import './styles.scss';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	name: string;
}

export function Input(props: InputProps): ReactElement {
	const { inputError, setFormState } = useFormContext();

	function enableInput(event: FocusEvent<HTMLInputElement, Element>): void {
		event.target.readOnly = false;
	}

	function getTitle(): string | undefined {
		return inputError[props.name]?.message;
	}

	function getStatus(): string {
		return inputError[props.name] ? '🔴' : '';
	}

	function handleChange(event: ChangeEvent<HTMLInputElement>): void {
		setFormState((prev) => ({
			...prev,
			fields: {
				...prev.fields,
				[event.target.name]: event.target.value,
			},
		}));
	}

	return (
		<div className="container">
			<input
				{...props}
				className="input"
				readOnly
				onFocus={enableInput}
				data-testid={props.name}
				onChange={handleChange}
			/>
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
