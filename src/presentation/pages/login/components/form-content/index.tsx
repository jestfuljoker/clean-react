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
	const { fields } = useFormContext<LoginForm>();

	useEffect(() => {
		validation.validate<LoginForm>('email', fields.email);
	}, [fields.email]);

	useEffect(() => {
		validation.validate<LoginForm>('password', fields.password);
	}, [fields.password]);

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

			<Button data-testid="submit-button" type="submit" disabled>
				Sign in
			</Button>

			<span className="link">Sign up</span>

			<FormStatus />
		</>
	);
}
