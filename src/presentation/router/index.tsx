import type { ReactElement } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Login } from '../pages';

export function Router(): ReactElement {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/login" element={<Login />} />
			</Routes>
		</BrowserRouter>
	);
}
