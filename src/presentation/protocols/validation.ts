export interface Validation {
	validate: <T = unknown>(name: keyof T, value: T[keyof T]) => string | null;
}
