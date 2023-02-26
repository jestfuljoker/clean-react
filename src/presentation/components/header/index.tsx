import type { ReactElement } from 'react';
import { memo } from 'react';

import { Logo } from '../logo';
import './styles.scss';

function HeaderComponent(): ReactElement {
	return (
		<header className="header-large">
			<Logo />
			<h1>4Dev - Developers poll</h1>
		</header>
	);
}

export const Header = memo(HeaderComponent);
