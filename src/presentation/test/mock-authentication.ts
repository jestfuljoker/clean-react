import type { AccountModel } from '~/domain/models';
import { mockAccountModel } from '~/domain/test';
import type { Authentication, AuthenticationParams } from '~/domain/usecases';

export class AuthenticationSpy implements Authentication {
	account = mockAccountModel();
	params: AuthenticationParams;

	async auth(params: AuthenticationParams): Promise<AccountModel> {
		this.params = params;

		return this.account;
	}
}
