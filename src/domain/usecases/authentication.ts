import type { AccountModel } from '../../domain/models/accountModel';

export type AuthenticationParams = {
	email: string;
	password: string;
};

export interface Authentication {
	auth: (params: AuthenticationParams) => Promise<AccountModel>;
}
