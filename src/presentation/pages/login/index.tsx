import type { ReactElement } from 'react';

import type { Authentication } from '~/domain/usecases';
import { Footer, Header } from '~/presentation/components';
import { FormContextProvider } from '~/presentation/contexts';
import type { Validation } from '~/presentation/protocols';

import { FormContent } from './components';
import './styles.scss';
import type { LoginForm } from './types';

type LoginProps = {
	validation: Validation;
	authentication: Authentication;
};

export function Login({
	validation,
	authentication,
}: LoginProps): ReactElement {
	async function handleSubmit(formData: LoginForm): Promise<void> {
		await authentication.auth(formData);
	}

	return (
		<div className="login">
			<Header />

			<FormContextProvider<LoginForm>
				onSubmit={handleSubmit}
				defaultValues={{
					email: '',
					password: '',
				}}
			>
				<h2>Login</h2>
				<FormContent validation={validation} />
			</FormContextProvider>

			<Footer />
		</div>
	);
}
