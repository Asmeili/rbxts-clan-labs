import { ClanLabsClient } from "./ClanLabsClient";
import { User as UserType } from "../types/User";

/**
 * @description An object representing an user.
 */
export class User {
	constructor(private readonly client: ClanLabsClient, public data: UserType) {}

	/**
	 * @description Increments the user's experience by the provided amount.
	 * @param {number} xp The xp amount to increment by.
	 * @returns {Promise<UserType>}
	 */
	async incrementExperience(xp: number) {
		return await this.client.apis.userApi
			.incrementUserExperience(this.data.userid, xp)
			.tap((newUser) => (this.data = newUser));
	}

	/**
	 * @description Sets the user's experience to the provided amount.
	 * @param {number} xp The xp to set to.
	 * @returns {Promise<UserType>}
	 */
	async setExperience(xp: number) {
		return await this.client.apis.userApi
			.setUserExperience(this.data.userid, xp)
			.tap((newUser) => (this.data = newUser));
	}

	/**
	 * @description Awards the provided medal to the provided user.
	 * @param {number} medalId The id of the medal to award.
	 * @returns {Promise<UserType>}
	 */
	async awardMedal(medalId: number) {
		return await this.client.apis.medalApi
			.awardMedal(this.data.userid, medalId)
			.tap((newUser) => (this.data = newUser));
	}

	async getMedals() {
		const medals = await this.client.apis.medalApi.getMedals();
		return this.data.medals.map((medal) => {
			const existingMedal = medals.find((existingMedal) => existingMedal.Id === medal);
			assert(existingMedal);
			return existingMedal;
		});
	}
}
