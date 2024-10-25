import { MediaQueryUnit } from './media-query-unit.model';
import { MediaQueryEnum } from './media-query.enum';

export class MediaQuery {
	private readonly indexMin: number;
	private readonly indexMax: number;
	list: MediaQueryUnit[];

	constructor(list: MediaQueryUnit[] = [], indexMin = 0, indexMax = 0) {
		this.list = list;
		this.indexMin = this.checkNoNegative(indexMin);
		this.indexMax = this.checkNoNegative(indexMax);
		this.checkFirstHasMatch();
	}

	private checkNoNegative(value: number): number {
		return value >= 0 ? value : 0;
	}

	private checkFirstHasMatch(): void {
		if(!this.list.length) {
			return;
		}
		this.list[0].hasMatch = true;
	}

	getMediaQueryMax(): MediaQueryUnit {
		return this.list[this.indexMax];
	}

	getMediaQueryMin(): MediaQueryUnit {
		return this.list[this.indexMin];
	}

	containsMediaQuery(...mediaQuery: MediaQueryEnum[]): boolean {
		return mediaQuery.every((media: MediaQueryEnum) => this.list.some((mediaQueryUnit: MediaQueryUnit) => mediaQueryUnit.mediaQuery === media && mediaQueryUnit.hasMatch));
	}
}
