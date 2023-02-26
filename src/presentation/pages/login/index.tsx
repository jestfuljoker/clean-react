import type { ReactElement } from 'react';

import { Footer, Header } from '~/presentation/components';
import { FormContextProvider } from '~/presentation/contexts';

import { FormContent } from './components';

import './styles.scss';

export function Login(): ReactElement {
	return (
		<div className="login">
			<Header />

			<FormContextProvider>
				<form>
					<h2>Login</h2>
					<FormContent />
				</form>
			</FormContextProvider>

			<Footer />
		</div>
	);
}
