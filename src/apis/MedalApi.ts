import { BaseApi } from "./BaseApi";

import { Medal, isMedals } from "../types/Medal";
import { User, isUser } from "../types/User";

/**
 * @description An object responsible for all medal related apis.
 */
export class MedalApi extends BaseApi {
	constructor(token?: string, clanId?: string) {
		super({
			baseUrl: "https://api.clanlabs.co/v1/medal",
			token,
			clanId,
		});
	}

	/**
	 * @returns {Promise<Medal[]>} An array of pure medal data.
	 */
	async getMedals() {
		const data = await this.request({
			path: "",
			method: "GET",
			needsAuth: true,
			expectedCode: 200,
		});
		assert(isMedals(data));
		return data;
	}

	/**
	 * @description Awards the provided medal to the provided user.
	 * @param {number} userId The id of the user whose being awarded the medal.
	 * @param {number} medalId The id of the medal to award.
	 * @returns {Promise<User>} The new pure user data.
	 */
	async awardMedal(userId: number, medalId: number) {
		const data = await this.request({
			path: `award/${userId}/${medalId}`,
			method: "POST",
			needsAuth: true,
			expectedCode: 200,
		});
		assert(isUser(data));
		return data;
	}
}
