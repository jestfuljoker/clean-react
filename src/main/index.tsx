import React from 'react';
import ReactDOM from 'react-dom/client';

import { Router } from '~/presentation/router';

import '~/presentation/styles/global.scss';
import { makeLogin } from './factories';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<Router makeLogin={makeLogin} />
	</React.StrictMode>,
);
