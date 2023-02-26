import type { ReactElement, ReactNode } from 'react';
import { useMemo, useState, createContext, useContext } from 'react';

type ChildType = {
	children: ReactNode;
};

type FormStateProps = {
	isLoading: boolean;
	inputError: Record<string, { message?: string }>;
	formError: {
		message?: string;
	};
};

const FormContext = createContext<FormStateProps | undefined>(undefined);

export function FormContextProvider({ children }: ChildType): ReactElement {
	const [formState, _setFormState] = useState<FormStateProps>(() => ({
		isLoading: false,
		inputError: {},
		formError: {},
	}));

	const values = useMemo(
		() => ({
			...formState,
		}),
		[formState],
	);

	return <FormContext.Provider value={values}>{children}</FormContext.Provider>;
}

export function useFormContext(): FormStateProps {
	const values = useContext(FormContext);

	if (!values) {
		throw new Error('Error while trying to create form context.');
	}

	return values;
}
