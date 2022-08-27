import { BaseApi } from "./BaseApi";

import { Blacklist, isBlacklist, isBlacklists } from "../types/Blacklist";

/**
 * @description An object responsible for all blacklist related apis.
 */
export class BlacklistApi extends BaseApi {
	constructor(token?: string, clanId?: string) {
		super({
			baseUrl: "https://api.clanlabs.co/v1/blacklist",
			token,
			clanId,
		});
	}

	/**
	 * @returns {Promise<Blacklist[]>} An array of pure blacklist data.
	 */
	async getBlacklists() {
		const data = await this.request({
			path: "",
			method: "GET",
			needsAuth: true,
			expectedCode: 200,
		});
		assert(isBlacklists(data));
		return data;
	}

	/**
	 * @param {string} blacklistId The id of the blacklist whose data is being fetched.
	 * @returns {Promise<Blacklist>} The pure blacklist data.
	 */
	async getBlacklist(blacklistId: string) {
		const data = await this.request({
			path: `${blacklistId}`,
			method: "GET",
			needsAuth: true,
			expectedCode: 200,
		});
		if (data === undefined) return undefined;
		assert(isBlacklist(data));
		return data;
	}

	/**
	 * @description Deletes a blacklist.
	 * @param {string} blacklistId The id of the blacklist whose is being deleted.
	 */
	async deleteBlacklist(blacklistId: string): Promise<void> {
		await this.request({
			path: `${blacklistId}`,
			method: "DELETE",
			needsAuth: true,
			expectedCode: 200,
		});
	}

	/**
	 * @description Updates the description of the provided blacklist.
	 *
	 * **Important**: The current public documentation on this endpoint is incorrect, thus this method is not implemented yet.
	 * @param {string} blacklistId The id of the blacklist whose description is being updated.
	 * @param {string} blacklistDescription The new description to update to.
	 */
	async updateBlacklistDescription(blacklistId: string, blacklistDescription: string) {
		await this.request({
			path: `${blacklistId}/description/${blacklistDescription}`,
			method: "POST",
			needsAuth: true,
			expectedCode: 200,
		});
	}
}
