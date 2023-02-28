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
	return (
		<div className="login">
			<Header />

			<FormContextProvider<LoginForm>
				defaultValues={{
					email: '',
					password: '',
				}}
			>
				<form>
					<h2>Login</h2>
					<FormContent validation={validation} />
				</form>
			</FormContextProvider>

			<Footer />
		</div>
	);
}
