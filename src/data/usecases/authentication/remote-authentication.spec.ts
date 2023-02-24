import type { HttpPostClient } from 'data/protocols/http/http-post-client';

class RemoteAuthentication {
	constructor(
		private readonly url: string,
		private readonly httpPostClient: HttpPostClient,
	) {}

	async auth(): Promise<void> {
		await this.httpPostClient.post(this.url);
	}
}

describe('RemoteAuthentication', () => {
	it('should call HttpPostClient with correct URL', async () => {
		class HttpPostClientSpy implements HttpPostClient {
			url?: string;

			async post(url: string): Promise<void> {
				this.url = url;
				await Promise.resolve();
			}
		}

		const url = 'any_url';
		const httpPostClientSpy = new HttpPostClientSpy();
		const sut = new RemoteAuthentication(url, httpPostClientSpy); // system under test

		await sut.auth();

		expect(httpPostClientSpy.url).toBe(url);
	});
});
