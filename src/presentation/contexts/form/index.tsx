import type { Dispatch, ReactElement, ReactNode, SetStateAction } from 'react';
import { useMemo, useState, createContext, useContext } from 'react';

type FormContextProviderProps<T> = {
	children: ReactNode;
	defaultValues?: T;
	onSubmit: (data: Record<keyof T, T[keyof T]>) => Promise<void> | void;
};

type FormStateProps<T> = {
	isLoading: boolean;
	inputError: Record<keyof T, T[keyof T]>;
	formError: {
		message?: string;
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
	onSubmit,
}: FormContextProviderProps<T>): ReactElement {
	const [formState, setFormState] = useState<FormStateProps<T>>(() => ({
		isLoading: false,
		inputError: {} as Record<keyof T, T[keyof T]>,
		formError: {},
		fields: defaultValues as Record<keyof T, T[keyof T]>,
	}));

	const values = useMemo(
		() => ({
			...formState,
			setFormState,
		}),
		[formState],
	);

	function inputHasError(): boolean {
		return Object.values(formState.inputError).some((value) => !!value);
	}

	return (
		<FormContext.Provider value={values as FormContextProps<unknown>}>
			<form
				data-testid="form"
				onSubmit={(event) => {
					event.preventDefault();
					try {
						if (formState.isLoading || inputHasError()) {
							return;
						}

						setFormState((prev) => ({
							...prev,
							isLoading: true,
						}));
						void onSubmit(formState.fields);
					} catch (error) {
						console.error(error);
					}
				}}
			>
				{children}
			</form>
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
