import type { Dispatch, ReactElement, ReactNode, SetStateAction } from 'react';
import { useMemo, useState, createContext, useContext } from 'react';

type FormContextProviderProps<T> = {
	children: ReactNode;
	defaultValues?: T;
};

type FormStateProps<T> = {
	isLoading: boolean;
	inputError: Record<keyof T, T[keyof T]>;
	formError: {
		message: string;
	};
	fields: Record<keyof T, T[keyof T]>;
};

interface FormContextProps<T = unknown> extends FormStateProps<T> {
	setFormState: Dispatch<SetStateAction<FormStateProps<T>>>;
}

const FormContext = createContext<FormContextProps | undefined>(undefined);

export function FormContextProvider<T = unknown>({
	children,
	defaultValues,
}: FormContextProviderProps<T>): ReactElement {
	const [formState, setFormState] = useState<FormStateProps<T>>(() => ({
		isLoading: false,
		inputError: {} as Record<keyof T, T[keyof T]>,
		formError: {
			message: '',
		},
		fields: defaultValues as Record<keyof T, T[keyof T]>,
	}));

	const values = useMemo(
		() => ({
			...formState,
			setFormState,
		}),
		[formState],
	);

	return (
		<FormContext.Provider value={values as FormContextProps<unknown>}>
			{children}
		</FormContext.Provider>
	);
}

export function useFormContext<T>(): FormContextProps<T> {
	const values = useContext(FormContext) as FormContextProps<T>;

	if (!values) {
		throw new Error('Error while trying to create form context.');
	}

	return values;
}
