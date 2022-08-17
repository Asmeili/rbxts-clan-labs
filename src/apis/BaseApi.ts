import { HttpService } from "@rbxts/services";

type BaseApiOptions = {
	baseUrl: string;
	token?: string;
	clanId?: string;
};
type BaseApiRequestOptions = {
	path: string;
	method: RequestAsyncRequest["Method"];
	needsAuth?: boolean;
	expectedCode?: number;
	headers?: RequestAsyncRequest["Headers"];
};
export abstract class BaseApi {
	constructor(private options: BaseApiOptions) {}

	setToken(token: string) {
		this.options.token = token;
	}
	setClanId(clanId: string) {
		this.options.clanId = clanId;
	}

	protected async request(options: BaseApiRequestOptions) {
		const url = `${this.options.baseUrl}/${options.path}`;
		const headers = options.needsAuth ? this.addAuth(options.headers) : options.headers;
		const response = HttpService.RequestAsync({
			Url: url,
			Headers: headers,
			Method: options.method,
		});

		if (response.Body === undefined) {
			return undefined;
		}
		if (options.expectedCode !== undefined) {
			assert(response.StatusCode === options.expectedCode);
		}
		return HttpService.JSONDecode(response.Body);
	}

	private addAuth(headers: RequestAsyncRequest["Headers"]) {
		assert(this.options.token !== undefined, `Must set token.`);
		assert(this.options.clanId !== undefined, `Must set clan id.`);
		return {
			...headers,
			auth: this.options.token,
			clan: this.options.clanId,
		};
	}
}
