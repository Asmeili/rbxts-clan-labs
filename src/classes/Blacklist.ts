import { ClanLabsClient } from "./ClanLabsClient";
import { Blacklist as BlacklistType } from "../types/Blacklist";

/**
 * @description An object representing a blacklist.
 */
export class Blacklist {
	constructor(private readonly client: ClanLabsClient, public data: BlacklistType) {}

	/**
	 * @description Deletes the blacklist from the list of all blacklists.
	 * @returns {Promise<void>}
	 */
	async delete() {
		return await this.client.apis.blacklistApi.deleteBlacklist(this.data.Id);
	}

	/**
	 * @description Updates the description the blacklist.
	 * @param {string} blacklistDescription The new description.
	 * @returns {Promise<void>}
	 */
	async updateDescription(blacklistDescription: string) {
		return await this.client.apis.blacklistApi
			.updateBlacklistDescription(this.data.Id, blacklistDescription)
			.tap(() => (this.data.Description = blacklistDescription));
	}
}
