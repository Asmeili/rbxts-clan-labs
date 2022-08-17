import { t } from "@rbxts/t";

export type Medal = {
	_id: string;
	Id: number;
	Description: string;
	Name: string;
	Emote: string;
	Role: string | undefined | undefined;
	created: number;
};

export const medalTypeGuard = t.strictInterface({
	_id: t.string,
	Id: t.number,
	Description: t.string,
	Name: t.string,
	Emote: t.string,
	Role: t.optional(t.string),
	created: t.number,
});
const medalsTypeGuard = t.array(medalTypeGuard);

export const isMedal = (value: unknown): value is Medal => medalTypeGuard(value);
export const isMedals = (value: unknown): value is Medal[] => medalsTypeGuard(value);
