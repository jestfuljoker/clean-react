import type { ReactElement } from 'react';

import { Input, Button, FormStatus } from '~/presentation/components';

export function FormContent(): ReactElement {
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
