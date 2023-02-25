import { InvalidCredentialsError, UnexpectedError } from '~/domain/errors';
import type { AccountModel } from '~/domain/models';
import type { AuthenticationParams, Authentication } from '~/domain/usecases';

import { HttpStatusCode } from '../../protocols/http';
import type { HttpPostClient } from '../../protocols/http';

export class RemoteAuthentication implements Authentication {
	constructor(
		private readonly url: string,
		private readonly httpPostClient: HttpPostClient<
			AuthenticationParams,
			AccountModel
		>,
	) {}

	async auth(params: AuthenticationParams): Promise<AccountModel> {
		const httpResponse = await this.httpPostClient.post({
			url: this.url,
			body: params,
		});

		switch (httpResponse.statusCode) {
			case HttpStatusCode.ok:
				return httpResponse.body as AccountModel;
			case HttpStatusCode.unauthorized:
				throw new InvalidCredentialsError();
			default:
				throw new UnexpectedError();
		}
	}
}
