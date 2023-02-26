import type { ReactElement } from 'react';

import { Button, Input, Spinner } from '~/presentation/components';

import { logo } from './constants';

import './styles.scss';

export function Login(): ReactElement {
	return (
		<div className="login">
			<header>
				<img src={logo} alt="4dev logo" />
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
