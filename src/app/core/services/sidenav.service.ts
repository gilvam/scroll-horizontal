import { Injectable } from '@angular/core';
import { MatDrawerToggleResult, MatSidenav } from '@angular/material/sidenav';
import { INav } from '../components/sidenav/_shared/nav.interface';

@Injectable({ providedIn: 'root' })
export class SidenavService {
	private sidenav?: MatSidenav;
	private navList: INav[] = [
		{
			route: '/about',
			name: 'config',
			icon: 'info_outline'
		}
	];

	setNavList(navList: INav[]): void {
		this.navList.unshift(...navList);
	}

	getNavList(): INav[] {
		return this.navList;
	}

	set(sidenav?: MatSidenav): void {
		this.sidenav = sidenav;
	}

	open(): Promise<MatDrawerToggleResult> | undefined {
		return this.sidenav?.open();
	}

	close(): Promise<MatDrawerToggleResult> | undefined {
		return this.sidenav?.close();
	}

	toggle(): void {
		this.sidenav?.toggle();
	}
}
