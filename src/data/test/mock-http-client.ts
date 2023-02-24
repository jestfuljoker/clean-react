import type {
	HttpPostClient,
	HttpPostParams,
} from '~/data/protocols/http/http-post-client';

import type { HttpResponse } from '../protocols/http/http-response';
import { HttpStatusCode } from '../protocols/http/http-response';

export class HttpPostClientSpy implements HttpPostClient {
	url?: string;
	body?: object;
	response: HttpResponse = {
		statusCode: HttpStatusCode.ok,
	};

	async post({ url, body }: HttpPostParams): Promise<HttpResponse> {
		this.url = url;
		this.body = body;

		return this.response;
	}
}
