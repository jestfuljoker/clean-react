import type { ComponentType, ReactElement } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

type Props = {
	makeLogin: ComponentType;
};

export function Router({ makeLogin }: Props): ReactElement {
	return (
		<BrowserRouter>
			<Switch>
				<Route path="/login" exact component={makeLogin} />
			</Switch>
		</BrowserRouter>
	);
}
