import { MediaQueryBreakpointEnum } from './media-query-breakpoint.enum';

export class MediaQueryMax {
	value: MediaQueryBreakpointEnum;
	max: number;

	constructor(value = MediaQueryBreakpointEnum.XS, max = 0) {
		this.value = value;
		this.max = max;
	}
}
