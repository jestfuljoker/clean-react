import type { ReactElement } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { Login } from '../pages';

export function Router(): ReactElement {
	return (
		<BrowserRouter>
			<Switch>
				<Route path="/login" component={Login} />
			</Switch>
		</BrowserRouter>
	);
}
