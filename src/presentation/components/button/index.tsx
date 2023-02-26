import type { ButtonHTMLAttributes, ReactElement, ReactNode } from 'react';
import './styles.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: ReactNode;
}

export function Button({ children, ...rest }: ButtonProps): ReactElement {
	return (
		<button {...rest} className="button">
			{children}
		</button>
	);
}
