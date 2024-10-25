import { MediaQueryEnum } from './media-query.enum';
import { MediaQueryBreakpointEnum } from './media-query-breakpoint.enum';
import { EnumUtil } from '../../../../_shared/utils/enum.util';
import { NumberUtil } from '../../../../_shared/utils/number.util';

export class MediaQueryUnit {
	mediaQuery: MediaQueryEnum;
	value: number;
	mediaQueryBreakpoint: MediaQueryBreakpointEnum;
	hasMatch: boolean;

	constructor(mediaQueryBreakpoint: MediaQueryBreakpointEnum, hasMatch = false, mediaQuery?: MediaQueryEnum, value = 0) {
		this.mediaQueryBreakpoint = mediaQueryBreakpoint;
		this.mediaQuery = mediaQuery || EnumUtil.getKey<MediaQueryEnum>(mediaQueryBreakpoint as string, MediaQueryBreakpointEnum);
		this.value = value || NumberUtil.onlyNumber(mediaQueryBreakpoint);
		this.hasMatch = hasMatch;
	}
}
