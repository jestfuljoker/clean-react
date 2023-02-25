import type { HttpResponse } from '.';

export type HttpPostParams<T> = {
	url: string;
	body?: T;
};

export interface HttpPostClient<TParamsBody, TResponseBody> {
	post: (
		params: HttpPostParams<TParamsBody>,
	) => Promise<HttpResponse<TResponseBody>>;
}
