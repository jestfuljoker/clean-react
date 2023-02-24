import type {
	HttpPostClient,
	HttpPostParams,
} from '../../data/protocols/http/http-post-client';

export class HttpPostClientSpy implements HttpPostClient {
	url?: string;
	body?: object;

	async post({ url, body }: HttpPostParams): Promise<void> {
		this.url = url;
		this.body = body;
		await Promise.resolve();
	}
}
