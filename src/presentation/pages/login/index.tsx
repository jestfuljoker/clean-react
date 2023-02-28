import type { ReactElement } from 'react';

import { Footer, Header } from '~/presentation/components';
import { FormContextProvider } from '~/presentation/contexts';
import type { Validation } from '~/presentation/protocols';

import { FormContent } from './components';
import './styles.scss';
import type { LoginForm } from './types';

type LoginProps = {
	validation: Validation;
};

export function Login({ validation }: LoginProps): ReactElement {
	function handleSubmit(data: LoginForm): void {
		console.log({ data });
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
