import { BaseApi } from "./BaseApi";

import { User, isUser } from "../types/User";

/**
 * @description An object responsible for all user related apis.
 */
export class UserApi extends BaseApi {
	constructor(token?: string, clanId?: string) {
		super({
			baseUrl: "https://api.clanlabs.co/v1/users",
			token,
			clanId,
		});
	}

	/**
	 * @param {number} userId The id of the user being fetched.
	 * @returns {Promise<User>} The pure user data.
	 */
	async getUser(userId: number) {
		const data = await this.request({
			path: `${userId}`,
			method: "GET",
			needsAuth: true,
			expectedCode: 200,
		});
		assert(isUser(data));
		return data;
	}

	/**
	 * @description Increments the current experience of the provided user by the provided increment.
	 * @param {number} userId The id of the user whose experience is being incremented.
	 * @param {number} xp The amount to increment by.
	 * @returns {Promise<User>} The new pure user data.
	 */
	async incrementUserExperience(userId: number, xp: number) {
		const data = await this.request({
			path: `${userId}/experience/increment/${xp}`,
			method: "POST",
			needsAuth: true,
			expectedCode: 200,
		});
		assert(isUser(data));
		return data;
	}

	/**
	 * @description Sets the current experience of the provided by to the provided value.
	 * @param {number} userId The id of the user whose experience is being set.
	 * @param {number} xp The amount to set to.
	 * @returns {Promise<User>} The new pure user data.
	 */
	async setUserExperience(userId: number, xp: number) {
		const data = await this.request({
			path: `${userId}/experience/set/${xp}`,
			method: "POST",
			needsAuth: true,
			expectedCode: 200,
		});
		assert(isUser(data));
		return data;
	}
}
