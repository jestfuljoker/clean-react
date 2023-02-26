import type { ReactElement } from 'react';
import { memo } from 'react';
import './styles.scss';

function FooterComponent(): ReactElement {
	return <footer />;
}

export const Footer = memo(FooterComponent);
