import axios from 'axios';

import type { HttpPostParams } from '~/data/protocols/http';

export class AxiosHttpClient {
	async post(params: HttpPostParams<any>): Promise<void> {
		await axios.post(params.url);
	}
}
