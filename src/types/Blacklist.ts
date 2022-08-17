import { t } from "@rbxts/t";

export type BlacklistType = "User" | "Group";
export type Blacklist = {
	_id: string;
	Id: string;
	Name: string;
	Description: string;
	Type: BlacklistType;
};

const blacklistTypeGuard = t.strictInterface({
	_id: t.string,
	Id: t.string,
	Name: t.string,
	Description: t.string,
	Type: t.string,
});
const blacklistsTypeGuard = t.array(blacklistTypeGuard);

export const isBlacklist = (value: unknown): value is Blacklist => blacklistTypeGuard(value);
export const isBlacklists = (value: unknown): value is Blacklist[] => blacklistsTypeGuard(value);
