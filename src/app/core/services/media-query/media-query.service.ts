import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { BreakpointObserver, BreakpointState, MediaMatcher } from '@angular/cdk/layout';
import { MediaQueryEnum } from './model/media-query.enum';
import { MediaQueryBreakpointEnum } from './model/media-query-breakpoint.enum';
import { MediaQuery } from './model/media-query.model';
import { MediaQueryUnit } from './model/media-query-unit.model';

@Injectable({ providedIn: 'root' })
export class MediaQueryService {
	onchange: Observable<MediaQuery>;
	mediaQuery = new MediaQuery();

	private mediaQueryBreakpointList = [
		MediaQueryBreakpointEnum.XS,
		MediaQueryBreakpointEnum.SM,
		MediaQueryBreakpointEnum.MD,
		MediaQueryBreakpointEnum.LG,
		MediaQueryBreakpointEnum.XL,
		MediaQueryBreakpointEnum.XX
	];

	constructor(
		private breakpointObserver: BreakpointObserver,
		private mediaMatcher: MediaMatcher
	) {
		this.onchange = this.breakpointObserver
			.observe(this.mediaQueryBreakpointList)
			.pipe(map((breakpointState) => this.createMediaQuery(breakpointState)));
	}

	private createMediaQuery(breakpointState: BreakpointState): MediaQuery {
		// this.mediaQueryBreakpointList.filter(breakpoint => this.mediaMatcher.matchMedia(breakpoint).matches)
		const list = Object.entries(breakpointState.breakpoints).map(
			([key, value]) => new MediaQueryUnit(key as MediaQueryBreakpointEnum, value)
		);
		const indexMin = list.findIndex((it) => it.hasMatch);
		const indexMax = list.reduceRight((previousValue, mediaQueryUnit, index) => {
			return previousValue === -1 && mediaQueryUnit.hasMatch ? index : previousValue;
		}, -1);
		return (this.mediaQuery = new MediaQuery(list, indexMin, indexMax));
	}

	get isSmall(): boolean {
		return this.mediaQuery.containsMediaQuery(MediaQueryEnum.XS, MediaQueryEnum.SM, MediaQueryEnum.MD);
	}

	get isLarge(): boolean {
		return this.mediaQuery.containsMediaQuery(MediaQueryEnum.LG, MediaQueryEnum.XL, MediaQueryEnum.XX);
	}
}
