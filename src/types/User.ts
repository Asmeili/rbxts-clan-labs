import { t } from "@rbxts/t";

export type User = {
	_id: string;
	userid: number;
	username: string;
	experience: number;
	quotaPoints: number;
	rank: number;
	rankName: string;
	nextRankExperience: number;
	nextRankName: string;
	currentRankExperience: number;
	staticRank: boolean;
	medals: number[];
	boosting: boolean;
	primary: boolean;
	nextRankLocked: boolean;
};

const userTypeGuard = t.strictInterface({
	_id: t.string,
	userid: t.number,
	username: t.string,
	experience: t.number,
	quotaPoints: t.number,
	rank: t.number,
	rankName: t.string,
	nextRankExperience: t.number,
	nextRankName: t.string,
	currentRankExperience: t.number,
	staticRank: t.boolean,
	medals: t.array(t.number),
	boosting: t.boolean,
	primary: t.boolean,
	nextRankLocked: t.boolean,
});

export const isUser = (value: unknown): value is User => userTypeGuard(value);
