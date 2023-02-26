import React from 'react';
import ReactDOM from 'react-dom/client';

import { Login } from '~/presentation/pages/login';
import '~/presentation/styles/global.scss';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<Login />
	</React.StrictMode>,
);
