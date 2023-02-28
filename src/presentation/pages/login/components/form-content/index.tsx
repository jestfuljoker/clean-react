import type { ReactElement } from 'react';
import { useEffect } from 'react';

import { Input, Button, FormStatus } from '~/presentation/components';
import { useFormContext } from '~/presentation/contexts';
import type { Validation } from '~/presentation/protocols';

import type { LoginForm } from '../../types';

type FormContentProps = {
	validation: Validation;
};

export function FormContent({ validation }: FormContentProps): ReactElement {
	const { fields, setFormState, inputError } = useFormContext<LoginForm>();

	useEffect(() => {
		setFormState((prev) => ({
			...prev,
			inputError: {
				...prev.inputError,
				email: validation.validate<LoginForm>('email', fields.email),
				password: validation.validate<LoginForm>('password', fields.password),
			},
		}));
	}, [fields.email, fields.password, setFormState, validation]);

	const shouldDisableButton =
		(!inputError.email || !inputError.password) &&
		!fields.email &&
		!fields.password;

	return (
		<>
			<Input
				id="email"
				type="email"
				name="email"
				placeholder="Enter your email"
			/>

			<Input
				id="password"
				type="password"
				name="password"
				placeholder="Enter your password"
			/>

			<Button
				data-testid="submit-button"
				type="submit"
				disabled={shouldDisableButton}
			>
				Sign in
			</Button>

			<span className="link">Sign up</span>

			<FormStatus />
		</>
	);
}
