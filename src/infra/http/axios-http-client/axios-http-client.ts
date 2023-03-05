import axios from 'axios';

import type {
	HttpPostClient,
	HttpPostParams,
	HttpResponse,
} from '~/data/protocols/http';

export class AxiosHttpClient<TParams, TResponse>
	implements HttpPostClient<TParams, TResponse>
{
	async post(
		params: HttpPostParams<TParams>,
	): Promise<HttpResponse<TResponse>> {
		const httpResponse = await axios.post(params.url, params.body);

		return {
			statusCode: httpResponse.status,
			body: httpResponse.data,
		};
	}
}
