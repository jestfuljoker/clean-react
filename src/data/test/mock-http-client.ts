import type {
	HttpPostClient,
	HttpPostParams,
} from '~/data/protocols/http/http-post-client';

import type { HttpResponse } from '../protocols/http/http-response';
import { HttpStatusCode } from '../protocols/http/http-response';

export class HttpPostClientSpy<TParamsBody, TResponseBody>
	implements HttpPostClient<TParamsBody, TResponseBody>
{
	url?: string;
	body?: TParamsBody;
	response: HttpResponse<TResponseBody> = {
		statusCode: HttpStatusCode.ok,
	};

	async post({
		url,
		body,
	}: HttpPostParams<TParamsBody>): Promise<HttpResponse<TResponseBody>> {
		this.url = url;
		this.body = body;

		return this.response;
	}
}
