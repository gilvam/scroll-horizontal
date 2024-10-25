import { StringUtil } from './string.util';

export class NumberUtil<T> {
	static onlyNumber(text: string | number | undefined): number {
		return Number(StringUtil.onlyNumber(text));
	}
}
