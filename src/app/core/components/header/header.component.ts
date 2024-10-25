import { Component, OnInit } from '@angular/core';
import { MatToolbar, MatToolbarModule } from '@angular/material/toolbar';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SidenavService } from '../../services/sidenav.service';
import { INav } from '../sidenav/_shared/nav.interface';
import { MatListItem } from '@angular/material/list';
import { BehaviorSubject, tap } from 'rxjs';
import { MediaQueryService } from '../../services/media-query/media-query.service';
import { AsyncPipe } from '@angular/common';

@Component({
	selector: 'app-header',
	standalone: true,
	imports: [MatToolbar, MatToolbarModule, MatIconButton, MatIcon, MatButton, RouterLink, RouterLinkActive, MatListItem, AsyncPipe],
	templateUrl: './header.component.html',
	styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
	$isSmall = new BehaviorSubject<boolean>(false);

	navList: INav[] = [
		{ route: '', name: 'Home' },
		{ route: '/cursos', name: 'Cursos' }
	];

	constructor(
		private mediaQueryService: MediaQueryService,
		private sidenavService: SidenavService
	) {
		this.sidenavService.setNavList(this.navList);
	}

	ngOnInit(): void {
		this.mediaQueryService.onchange.pipe(tap(() => this.$isSmall.next(this.mediaQueryService.isSmall))).subscribe();
	}

	get logo(): string {
		return `./assets/images/header-logo.png`;
	}

	sidenavToggle(): void {
		this.sidenavService.toggle();
	}
}
