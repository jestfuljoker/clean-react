import type {
	HttpPostClient,
	HttpPostParams,
	HttpResponse,
} from '../protocols/http';
import { HttpStatusCode } from '../protocols/http';

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
