import type { ReactElement } from 'react';

import { Button, Input, Logo, Spinner } from '~/presentation/components';

import './styles.scss';

export function Login(): ReactElement {
	return (
		<div className="login">
			<header>
				<Logo />
				<h1>4Dev - Developers poll</h1>
			</header>

			<form>
				<h2>Login</h2>
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

				<Button type="submit">Sign in</Button>

				<span className="link">Sign up</span>

				<div className="error-container">
					<Spinner />
					<span className="error">Error</span>
				</div>
			</form>

			<footer />
		</div>
	);
}
