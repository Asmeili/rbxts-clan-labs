import { BlacklistApi } from "../apis/BlacklistApi";
import { MedalApi } from "../apis/MedalApi";
import { UserApi } from "../apis/UserApi";

import { Blacklist } from "./Blacklist";
import { User } from "./User";

/**
 * @description A client that can interact with ClanLabs APIs.
 */
export class ClanLabsClient {
	/**
	 * @description Use the apis directly if no class implements them.
	 */
	readonly apis: {
		blacklistApi: BlacklistApi;
		medalApi: MedalApi;
		userApi: UserApi;
	};

	/**
	 * @param {string} token The token provided by ClanLabs.
	 * @param {string} clanId The clanId provided by ClanLabs.
	 */
	constructor(token?: string, clanId?: string) {
		this.apis = {
			blacklistApi: new BlacklistApi(token, clanId),
			medalApi: new MedalApi(token, clanId),
			userApi: new UserApi(token, clanId),
		};
	}

	/**
	 * @description Sets the new token to use for authentication to ClanLabs.
	 * @param {string} token The token provided by ClanLabs.
	 */
	setToken(token: string) {
		for (const [_, baseApi] of pairs(this.apis)) {
			baseApi.setToken(token);
		}
	}

	/**
	 * @description Sets the new clanId to use for authentication to ClanLabs.
	 * @param {string} clanId The clanId provided by ClanLabs.
	 */
	setClanId(clanId: string) {
		for (const [_, baseApi] of pairs(this.apis)) {
			baseApi.setClanId(clanId);
		}
	}

	/**
	 * @param {string} blacklistId The id of a blacklist object, can be obtained via `getBlacklists()`.
	 * @returns {Promise<Blacklist | undefined>} The blacklist object if one exists.
	 */
	async getBlacklist(blacklistId: string) {
		const blacklistData = await this.apis.blacklistApi.getBlacklist(blacklistId);
		if (blacklistData === undefined) return undefined;
		return new Blacklist(this, blacklistData);
	}

	/**
	 * @returns {Promise<Blacklist[]>} An array of blacklists.
	 */
	async getBlacklists() {
		const blacklistsData = await this.apis.blacklistApi.getBlacklists();
		return blacklistsData.map((blacklistData) => new Blacklist(this, blacklistData));
	}

	/**
	 * @param {number} userId The player's userId.
	 * @returns {Promise<User>} The user object.
	 */
	async getUser(userId: number) {
		const userData = await this.apis.userApi.getUser(userId);
		return new User(this, userData);
	}

	/**
	 * @returns {Promise<Medal[]>} An array of medals.
	 */
	async getMedals() {
		return await this.apis.medalApi.getMedals();
	}
}
