import axios from 'axios';

import type {
	HttpPostClient,
	HttpPostParams,
	HttpResponse,
} from '~/data/protocols/http';

export class AxiosHttpClient implements HttpPostClient<unknown, unknown> {
	async post(params: HttpPostParams<unknown>): Promise<HttpResponse<unknown>> {
		const httpResponse = await axios.post(params.url, params.body);

		return {
			statusCode: httpResponse.status,
			body: httpResponse.data,
		};
	}
}
