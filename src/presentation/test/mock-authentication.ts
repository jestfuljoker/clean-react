import type { AccountModel } from '~/domain/models';
import { mockAccountModel } from '~/domain/test';
import type { Authentication, AuthenticationParams } from '~/domain/usecases';

export class AuthenticationSpy implements Authentication {
	account = mockAccountModel();
	params: AuthenticationParams;
	callsCount = 0;

	async auth(params: AuthenticationParams): Promise<AccountModel> {
		this.params = params;
		this.callsCount += 1;

		return this.account;
	}
}
