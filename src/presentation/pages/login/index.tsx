import type { FormEvent, ReactElement } from 'react';

import type { Authentication } from '~/domain/usecases';
import { Footer, Header } from '~/presentation/components';
import { FormContextProvider, useFormContext } from '~/presentation/contexts';
import type { Validation } from '~/presentation/protocols';

import { FormContent } from './components';
import './styles.scss';

type LoginProps = {
	validation: Validation;
	authentication: Authentication;
};

export type LoginForm = {
	email: string;
	password: string;
};

function LoginComponent({
	validation,
	authentication,
}: LoginProps): ReactElement {
	const { isLoading, inputError, setFormState, fields } =
		useFormContext<LoginForm>();

	function inputHasError(): boolean {
		return Object.values(inputError).some((value) => !!value);
	}

	async function handleSubmit(
		event: FormEvent<HTMLFormElement>,
	): Promise<void> {
		event.preventDefault();

		try {
			if (isLoading || inputHasError()) {
				return;
			}

			setFormState((prev) => ({
				...prev,
				isLoading: true,
			}));

			const account = await authentication.auth(fields);

			localStorage.setItem('accessToken', account.accessToken);
		} catch (error) {
			setFormState((prev) => ({
				...prev,
				isLoading: false,
				formError: {
					message: (error as Error).message,
				},
			}));
		}
	}

	return (
		<div className="login">
			<Header />

			<h2>Login</h2>

			<form data-testid="form" onSubmit={handleSubmit}>
				<FormContent validation={validation} />
			</form>

			<Footer />
		</div>
	);
}

export function Login(props: LoginProps): ReactElement {
	return (
		<FormContextProvider<LoginForm>
			defaultValues={{
				email: '',
				password: '',
			}}
		>
			<LoginComponent {...props} />
		</FormContextProvider>
	);
}
